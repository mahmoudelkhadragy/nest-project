import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
  constructor(private usersService: UsersService) {}

  tweets: { text: string; data: Date; userId: number }[] = [
    { text: 'Hello World', data: new Date('2024-11-12'), userId: 1 },
    { text: 'Hello NestJS', data: new Date(), userId: 2 },
    { text: 'Hello TypeScript', data: new Date(), userId: 1 },
  ];

  getTweetsByUserId(userId: number) {
    const user = this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const tweets = this.tweets.filter((tweet) => tweet.userId === userId);
    const response = tweets.map((tweet) => ({
      text: tweet.text,
      data: tweet.data,
      name: `${user.firstName} ${user.lastName}`,
    }));
    return response;
  }
}
