import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UseGuards, UsePipes,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordsDto } from './dto/create-records.dto';
import { UpdateRecordsDto } from './dto/update-records.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Record } from '../../models/record/records.model';
import { Roles } from '../authorization/roles-auth.decorator';
import { RolesGuard } from '../authorization/roles.guard';
import { JwtAuthGuard } from '../authorization/jwt.auth.guard';
import { STRIPE_CLIENT } from '../../stripe/constants';
import { Stripe } from 'stripe';
import { UserService } from '../user/user.service';
import { MailService } from '../../mail/mail.service';
import { ValidationPipe } from '../../pipes/validation.pipe';

@ApiTags('Records')
@Controller('records')
export class RecordsController {

  constructor(
    private readonly recordService: RecordService,
    @Inject(STRIPE_CLIENT)
    private stripe: Stripe,
    private userService: UserService,
    private mailService: MailService,
  ) {
  }

  @ApiOperation({ summary: 'Creating record' })
  @ApiResponse({ status: 200, type: Record })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createRecord(@Body() createRecordsDto: CreateRecordsDto) {
    return this.recordService.createRecord(createRecordsDto);
  }

  @ApiOperation({ summary: 'Getting record by ID' })
  @ApiResponse({ status: 200, type: Record })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getRecordById(@Param() params) {
    return this.recordService.getRecordById(+params.id);
  }

  @ApiOperation({ summary: 'Getting record by author name' })
  @ApiResponse({ status: 200, type: [Record] })
  @Get('/author/:author')
  getRecordByAuthor(@Param('author') author: string) {
    return this.recordService.getRecordByAuthor(author);
  }

  @ApiOperation({ summary: 'Getting record by name' })
  @ApiResponse({ status: 200, type: [Record] })
  @Get('/name/:name')
  getRecordByName(@Param('name') name: string) {
    return this.recordService.getRecordByName(name);

  }

  @ApiOperation({ summary: 'Getting all records' })
  @ApiResponse({ status: 200, type: [Record] })
  @Get()
  getAllRecords() {
    return this.recordService.getAllRecords();
  }

  @Get('/sort/:asc')
  sortAscending(@Param('asc') asc: string) {
    return this.recordService.sortRecord(asc);
  }

  @Get('/sort/:des')
  sortDescending(@Param('des') des: string) {
    return this.recordService.sortRecord(des);
  }

  @ApiOperation({ summary: 'Update record' })
  @ApiResponse({ status: 200, type: Record })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  @Patch(':id')
  changeRecord(@Param() params, @Body() updateRecordsDto: UpdateRecordsDto) {
    return this.recordService.changeRecord(+params.id, updateRecordsDto.author, updateRecordsDto.name, updateRecordsDto.description, updateRecordsDto.price);
  }

  @ApiOperation({ summary: 'Delete record' })
  @ApiResponse({ status: 200, type: Record })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteRecord(@Param() params) {
    return this.recordService.deleteRecord(+params.id);
  }

  @ApiOperation({ summary: 'Buying record' })
  @ApiResponse({ status: 200, type: Record })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/buy/:id')
  async buyRecord(@Param() params, @Body() body) {

    const record = await this.recordService.getRecordById(+params.id);
    const user = await this.userService.getUserById(body.user_id);
    const bought = await this.recordService.checkBought(body.profile_id);

    if(+params.id) {
      throw new HttpException('You have this record already', HttpStatus.CREATED)
    }
    const cardToken = await this.stripe.tokens.create({
      card: {
        number: body.number,
        exp_month: body.exp_month,
        exp_year: body.exp_year,
        cvc: body.cvc,
        address_state: body.address_state,
        address_zip: body.address_zip,
      },
    });

    const charge = await this.stripe.charges.create({
      amount: record.price,
      currency: 'usd',
      source: cardToken.id,
      receipt_email: user.email,
      description: `Stripe Charge Of Amount for One Time Payment`,
    });

    if (charge.status === 'succeeded') {

      const message = 'You have made a purchase';
      await this.mailService.sendMessage(user.email, message);

      await this.recordService.markAsPurchased(body.profile_id, record.record_id);

      throw new HttpException({ Success: charge }, HttpStatus.CREATED);
    } else {
      throw new HttpException('Please try again later for One Time Payment', HttpStatus.BAD_REQUEST);
    }
  }
}
