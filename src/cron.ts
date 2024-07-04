// import { Handler, Context } from 'aws-lambda';

// export const handler: Handler = async () => {
//   console.log('in cron handler at');
//   console.log(Date.now().toLocaleString());
//   return;
// }

// ------------------------------------------------

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { UsersService } from './users/users.service';
// import { MailService } from './mailer/mail.service';

// export const handler = async (event: any, context: any) => {
//   const app = await NestFactory.createApplicationContext(AppModule);
//   const usersService = app.get(UsersService);
//   const mailService = app.get(MailService);

//   const now = new Date();
//   const startOfDay = new Date(now.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(now.setHours(23, 59, 59, 999));

//   const newUsers = await usersService.findUsersRegisteredBetween(startOfDay, endOfDay);
//   await mailService.sendUserList('admin@email.com', newUsers);

//   await app.close();
// };

// --------------------------------------------
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NewUsersService } from './cron/newUsers.service';

export const handler = async () => {
  console.log('---- Running daily cron -----');
  const app = await NestFactory.createApplicationContext(AppModule);
  const newUsersService = app.get(NewUsersService);

  await newUsersService.sendEmail();

  await app.close();
};
