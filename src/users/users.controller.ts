import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  // api tao moi user khi tao phải check username chua tồn tại trong db thì mới cho tạo

   @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() body: { username: string; password: string },
  ): Promise<any> {
    try {
      return await this.userService.create(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // lay user theo id

  @UseGuards(AuthGuard)
  @Get(':id')
  async finOne(@Param('id', ParseIntPipe) id: number): Promise<number> {
    try {
      return await this.userService.fineOne(+id);
      
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  // lay toan bo user
  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<any> {
    
    return this.userService.fineAll();
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: String): Promise<void> {
    await this.userService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(
    @Body() body: { id: number; username: string; password: string },
  ): Promise<any> {
    return this.userService.update(body);
  }
}
