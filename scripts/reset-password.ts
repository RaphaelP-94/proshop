import { prisma } from '../db/prisma';
import { hashSync } from 'bcrypt-ts-edge';

async function resetPassword() {
  const email = 'test@test.com';
  const newPassword = '12345678'; // Choose a new password
  const hashedPassword = hashSync(newPassword, 10);

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    console.log(`Password updated for user: ${updatedUser.email}`);
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();
