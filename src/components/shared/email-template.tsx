import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export function EmailTemplate({
  firstName,
  lastName,
  email,
  phone,
  message,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>{`Xin chào, tôi là ${firstName} ${lastName}!`}</h1>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Số điện thoại:</strong> {phone}
      </p>
      <p>
        <strong>Tin nhắn:</strong>
      </p>
      <p>{message}</p>
    </div>
  );
}
