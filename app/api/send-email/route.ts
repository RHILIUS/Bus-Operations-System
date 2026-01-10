import { EmailController } from '@/controllers/email';

const controller = new EmailController();

export async function POST(request: Request) {
  return controller.handleSend(request);
}
