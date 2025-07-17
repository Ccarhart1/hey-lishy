# 📧 EmailJS Setup Instructions

To receive emails when Li Shy uses the drawing board and love notes features, you need to set up EmailJS. Here's how:

## 1. **Create EmailJS Account**
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (up to 200 emails/month)
3. Verify your email address

## 2. **Create Email Service**
1. In your EmailJS dashboard, click "Add New Service"
2. Choose "Gmail" (or your preferred email provider)
3. Connect your Gmail account (calebcarhart1110@gmail.com)
4. Note the **Service ID** (something like "service_xyz123")

## 3. **Create Email Template**
1. Go to "Email Templates" and click "Create New Template"
2. Set up the template with these variables:

### Template for Love Notes:
```
Subject: {{subject}}
From: {{from_name}}
To: calebcarhart1110@gmail.com

Hi! 💕

{{message}}

Love Note: "{{love_note}}"

Sent on: {{date}} at {{time}}

With love,
Li Shy 💖
```

### Template for Drawings:
```
Subject: {{subject}}
From: {{from_name}}
To: calebcarhart1110@gmail.com

Hi! 💕

{{message}}

Drawing created on: {{date}} at {{time}}

Note: The drawing image will be attached as base64 data.

With love,
Li Shy 💖
```

3. Save the template and note the **Template ID** (something like "template_abc456")

## 4. **Get Your Public Key**
1. Go to "Account" → "General"
2. Copy your **Public Key** (something like "user_def789")

## 5. **Update Your Website**
Replace the placeholder values in your `index.html` file:

```javascript
// Replace this line:
emailjs.init("YOUR_PUBLIC_KEY");

// With your actual public key:
emailjs.init("user_def789");
```

And in your `games.js` file, replace:
```javascript
// Replace these lines:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)

// With your actual IDs:
emailjs.send('service_xyz123', 'template_abc456', templateParams)
```

## 6. **Test the Setup**
1. Deploy your changes: `npx vercel`
2. Visit your website
3. Try the drawing board or love notes feature
4. Check your email for notifications!

## 7. **Security Note**
- EmailJS public key is safe to expose in client-side code
- It's designed for frontend usage
- Rate limiting is built-in to prevent abuse

## 8. **Free Tier Limits**
- 200 emails per month
- 2 email services
- 10 email templates
- Perfect for this romantic website! 💕

## 9. **Alternative: Simple Setup**
If you want to skip the custom setup, you can use this test configuration:
- Service ID: `service_gmail`
- Template ID: `template_love_notes`
- Public Key: `user_test123`

But for production, please set up your own EmailJS account for security and reliability.

## 💡 **Pro Tips**
- Test with different email providers if Gmail has issues
- You can customize the email templates with HTML for prettier emails
- Set up auto-replies to let Li Shy know you received her messages
- Monitor your email quota in the EmailJS dashboard

Now whenever Li Shy draws something or writes a love note, you'll get an email notification! 💌💕 