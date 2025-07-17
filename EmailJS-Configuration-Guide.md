# 📧 EmailJS Configuration - Quick Setup Guide

## 🔧 **What You Need to Update**

You need to replace the placeholder values in the configuration file with your actual EmailJS credentials:

### **In `static/js/config.js`**:
```javascript
window.EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_ACTUAL_PUBLIC_KEY_HERE',    // Replace this
    SERVICE_ID: 'YOUR_ACTUAL_SERVICE_ID_HERE',    // Replace this
    TEMPLATE_ID: 'YOUR_ACTUAL_TEMPLATE_ID_HERE'   // Replace this
};
```

## 🔍 **Where to Find Your EmailJS Values**

1. **Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)**
2. **Public Key**: Account → General → Public Key
3. **Service ID**: Email Services → (your service) → Service ID
4. **Template ID**: Email Templates → (your template) → Template ID

## ⚡ **Quick Update Steps**

1. **Get your EmailJS values** from the dashboard
2. **Edit `static/js/config.js`** and replace the placeholder values
3. **Save the file**
4. **Deploy**: `npx vercel` or commit to GitHub

**That's it!** Now only one file needs to be updated, and it's separate from your main code.

## 🧪 **Testing the Email Functionality**

After updating the values:
1. Deploy the changes
2. Visit your website
3. Try the "Love Notes" feature
4. Check your email (calebcarhart1110@gmail.com)
5. You should receive an email notification!

## 📝 **Example Configuration**

If your EmailJS values are:
- Public Key: `abc123def456`
- Service ID: `service_gmail_xyz`
- Template ID: `template_love_notes`

Then update `static/js/config.js` like this:

```javascript
window.EMAILJS_CONFIG = {
    PUBLIC_KEY: 'abc123def456',
    SERVICE_ID: 'service_gmail_xyz',
    TEMPLATE_ID: 'template_love_notes'
};
```

## 🎯 **What Happens When Li Shy Uses the Features**

- **Love Notes**: You'll get an email with her message
- **Drawing Board**: You'll get an email with her drawing as base64 data
- **Success Messages**: She'll see confirmation that the email was sent
- **Fallback**: If email fails, it saves locally with a different message

## 💡 **Pro Tips**

- EmailJS public keys are safe to expose in client-side code
- Test with a simple love note first
- Check your spam folder if you don't see emails
- EmailJS free tier allows 200 emails/month (perfect for this!)

## 🔄 **After You Update**

1. **Commit changes**: `git add -A && git commit -m "Add EmailJS configuration"`
2. **Push to GitHub**: `git push origin main`
3. **Deploy**: `npx vercel`
4. **Test**: Have Li Shy try the love notes feature!

## 🌐 **Alternative: Using Vercel Environment Variables**

If you prefer not to commit your EmailJS credentials to the repository, you can:

1. **Set up environment variables in Vercel** (like you did)
2. **Create a serverless function** to handle email sending
3. **Use a build script** to inject environment variables during build

But for simplicity, the config file approach above is the easiest for static sites.

Now you're all set to receive sweet emails from Li Shy! 💕 