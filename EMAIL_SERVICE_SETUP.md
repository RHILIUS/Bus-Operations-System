# Email Service Setup

This document describes the email service implementation for the Bus Operations System.

## Files Created

### 1. `/lib/auth.ts`
Authentication helper function that validates user tokens and returns user information.

### 2. `/lib/mailer.ts`
Nodemailer transporter configuration using environment variables.

### 3. `/services/send-email.ts`
EmailService class that handles sending emails through the configured transporter.

### 4. `/controllers/email.ts`
EmailController class that provides REST API endpoints for sending emails with authentication.

### 5. `/app/api/send-email/route.ts`
Next.js API route that exposes the POST endpoint for sending emails.

## Environment Variables

Add these variables to your `.env.local` file:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Backend API
NEXT_PUBLIC_Backend_BaseURL=your-backend-url
```

### Gmail Setup (if using Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password" from your Google Account settings
3. Use the app password as `EMAIL_PASS` (not your regular password)

## Dependencies

The following packages have been added to `package.json`:

- `nodemailer`: ^6.9.8
- `@types/nodemailer`: ^6.4.14

Install dependencies:
```bash
npm install
```

## Usage

### API Endpoint

**POST** `/api/send-email`

**Headers:**
- Cookie with JWT token (for authentication)

**Request Body:**
```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "text": "Plain text content",
  "html": "<p>HTML content</p>"
}
```

**Response:**
```json
{
  "message": "Email sent successfully"
}
```

### Example Integration

```typescript
import { EmailService } from '@/services/send-email';

const emailService = new EmailService();

await emailService.sendEmail({
  to: 'customer@example.com',
  subject: 'Rental Request Approved',
  html: '<h1>Your rental has been approved!</h1>',
});
```

### Integration with Pending Page

The Pending page already has a TODO comment for email integration:

```typescript
// TODO: Implement actual email sending API call
// const emailResponse = await fetch('/api/send-email', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     to: rentalForEmail.email,
//     subject: 'Bus Rental Request Approved - Booking Confirmation',
//     content: emailContent
//   })
// });
```

You can now uncomment and update this to use the email API.

## Security

- All email endpoints require authentication via JWT token
- The `authenticateRequest` function validates tokens before allowing email sends
- Environment variables are used to store sensitive email credentials

## Testing

To test the email functionality:

1. Set up your environment variables
2. Start the development server: `npm run dev`
3. Make a POST request to `/api/send-email` with a valid JWT token
4. Check that the email was received

## Troubleshooting

### "Authentication failed" error
- Check that your JWT token is valid
- Verify `NEXT_PUBLIC_Backend_BaseURL` is set correctly

### "Failed to send email" error
- Verify email credentials in environment variables
- Check EMAIL_HOST, EMAIL_PORT, and EMAIL_SECURE settings
- For Gmail, ensure you're using an App Password, not your regular password
- Check firewall/network settings if using a custom SMTP server
