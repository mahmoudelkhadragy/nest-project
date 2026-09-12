import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [TweetService],
  controllers: [TweetController],
  imports: [UsersModule],
})
export class TweetModule {}
