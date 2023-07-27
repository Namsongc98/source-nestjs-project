import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

// This should be a real class/interface representing a user entity
interface user {
  id?: number;
  username: string;
  password: string
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findOne(username: string): Promise<any> {
    const result = await this.userRepository.findOneOrFail({
      where: {
        username: username,
      },
    });

    return result;
  }


  async create(body: user): Promise<any> {
    // validate input
    if (usernameRegex.test(body.username)) {
      // check username da ton tai trong db chua
      const count = await this.userRepository.count({
        where: {
          username: body.username,
        },
      });
      if (count > 0) {
        throw new BadRequestException(
          'Ban khong the tao moi vi username: ' + body.username + ' da ton tai!',
        );
      }
      const user = new User();
      Object.assign(user, body);
      return this.userRepository.save(user);
    } else {
      throw new BadRequestException('Username chứ ký tự đặc biệt')
    }
  }
  async fineOne(id: number): Promise<any> {
    return this.userRepository.findOneOrFail({
      where: {
        id: +id,
      },
    });
  }

  async fineAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(+id)
  };

  async update(body: user): Promise<any> {
    const checkExits = await this.userRepository.findOne({
      where: {
        id: body.id,
      }
    })

    if (checkExits) {
      const checkExits = new User()
      Object.assign(checkExits, body)
      return this.userRepository.save(checkExits)
    } else {
      throw new BadRequestException(`không tìm thấy user ${body.username}`)
    }
  }
}
