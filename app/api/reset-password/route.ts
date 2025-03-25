import { prisma } from '@/db/prisma';
import { hashSync } from 'bcrypt-ts-edge';
import { NextResponse } from 'next/server';

export async function GET() {
  const email = 'test@test.com';
  const newPassword = '12345678'; // Use the same password you're trying to sign in with

  // Generate a proper bcrypt hash
  const hashedPassword = hashSync(newPassword, 10);

  console.log('Generated hash:', hashedPassword);

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      success: true,
      message: `Password updated for user: ${updatedUser.email}`,
      hash: hashedPassword,
    });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error updating password',
        error: String(error),
      },
      { status: 500 }
    );
  }
}
