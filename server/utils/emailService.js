import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME || 'Vardha Warehousing'} <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return info;
  } catch (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }
};

export const sendCustomerConfirmation = async (data) => {
  const { name, email, requestId, type, warehouseType, areaRequired } = data;
  const subject = `Your ${type} has been received — ${requestId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="background: #1a1a2e; padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: #f59e0b; margin: 0; font-size: 28px;">Vardha Warehousing</h1>
        <p style="color: #94a3b8; margin: 8px 0 0;">Premium Warehouse Solutions Since 1987</p>
      </div>
      <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
        <h2 style="color: #1e293b; margin-top: 0;">Thank you for reaching out, ${name}!</h2>
        <p style="color: #475569; line-height: 1.6;">We have received your ${type} and our team will get back to you shortly. Here are your submission details:</p>
        <div style="background: #fff; padding: 20px; border-radius: 6px; border: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="margin: 8px 0; color: #334155;"><strong>Request ID:</strong> <span style="color: #f59e0b; font-family: monospace;">${requestId}</span></p>
          <p style="margin: 8px 0; color: #334155;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0; color: #334155;"><strong>Email:</strong> ${email}</p>
          ${warehouseType ? `<p style="margin: 8px 0; color: #334155;"><strong>Warehouse Type:</strong> ${warehouseType}</p>` : ''}
          ${areaRequired ? `<p style="margin: 8px 0; color: #334155;"><strong>Area Required:</strong> ${areaRequired}</p>` : ''}
        </div>
        <p style="color: #475569; line-height: 1.6;">Please save your Request ID for future reference. Our team will contact you within 24 hours.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" style="background: #f59e0b; color: #1a1a2e; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Visit Our Website</a>
        </div>
      </div>
      <div style="background: #1a1a2e; padding: 20px; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="color: #94a3b8; margin: 0; font-size: 12px;">Vardha Warehousing — Gorakhpur</p>
      </div>
    </div>
  `;
  return sendEmail({ to: email, subject, html });
};

export const sendInternalNotification = async (data) => {
  const { name, email, phone, requestId, type, subject, message, warehouseType, areaRequired, company, requirement, location } = data;
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  const subjectLine = `New ${type} received — ${requestId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="background: #1a1a2e; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: #f59e0b; margin: 0; font-size: 24px;">New ${type} Received</h1>
        <p style="color: #94a3b8; margin: 6px 0 0;">Vardha Warehousing Admin Notification</p>
      </div>
      <div style="background: #f8fafc; padding: 25px; border: 1px solid #e2e8f0; border-top: none;">
        <div style="background: #fff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 15px;">
          <p style="margin: 6px 0; color: #334155;"><strong>Request ID:</strong> <span style="color: #f59e0b; font-family: monospace; font-size: 14px;">${requestId}</span></p>
          <p style="margin: 6px 0; color: #334155;"><strong>Type:</strong> ${type}</p>
          <p style="margin: 6px 0; color: #334155;"><strong>Status:</strong> <span style="color: #22c55e;">New</span></p>
          <p style="margin: 6px 0; color: #334155;"><strong>Received:</strong> ${new Date().toLocaleString('en-IN')}</p>
        </div>
        <div style="background: #fff; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0;">
          <h3 style="color: #1e293b; margin-top: 0; font-size: 16px;">Customer Details</h3>
          <p style="margin: 6px 0; color: #334155;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 6px 0; color: #334155;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 6px 0; color: #334155;"><strong>Phone:</strong> ${phone}</p>
          ${company ? `<p style="margin: 6px 0; color: #334155;"><strong>Company:</strong> ${company}</p>` : ''}
          ${subject ? `<p style="margin: 6px 0; color: #334155;"><strong>Subject:</strong> ${subject}</p>` : ''}
          ${warehouseType ? `<p style="margin: 6px 0; color: #334155;"><strong>Warehouse Type:</strong> ${warehouseType}</p>` : ''}
          ${areaRequired ? `<p style="margin: 6px 0; color: #334155;"><strong>Area Required:</strong> ${areaRequired}</p>` : ''}
          ${location ? `<p style="margin: 6px 0; color: #334155;"><strong>Location:</strong> ${location}</p>` : ''}
          ${requirement ? `<p style="margin: 6px 0; color: #334155;"><strong>Requirement:</strong> ${requirement}</p>` : ''}
          ${message ? `<p style="margin: 6px 0; color: #334155;"><strong>Message:</strong></p><p style="background: #f1f5f9; padding: 10px; border-radius: 4px; color: #475569;">${message}</p>` : ''}
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/admin" style="background: #f59e0b; color: #1a1a2e; padding: 10px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">View in Admin Panel</a>
        </div>
      </div>
      <div style="background: #1a1a2e; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
        <p style="color: #94a3b8; margin: 0; font-size: 11px;">Vardha Warehousing — Automated Notification</p>
      </div>
    </div>
  `;
  return sendEmail({ to: adminEmail, subject: subjectLine, html });
};
