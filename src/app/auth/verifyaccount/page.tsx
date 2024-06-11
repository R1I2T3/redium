import React from "react";
import VerificationCodeForm from "@/components/auth/VerificationCodeForm";
interface verificationCodeProps {
  searchParams: {
    username: string;
  };
}
const VerifyAccountPage = ({
  searchParams: { username },
}: verificationCodeProps) => {
  return (
    <div className="flex flex-col justify-center  card border shadow-xl w-[90%] md:w-[60%] lg:w-[30%] p-3 gap-3">
      <VerificationCodeForm username={username} />
      <p className="text-[12px]">Check verification code in spam folder also</p>
    </div>
  );
};

export default VerifyAccountPage;
