import React, { useEffect, useRef, useState } from "react";

const PayProcessingForm = ({ txndetails }) => {
  const formRef = useRef(null);
  console.log(txndetails);

  useEffect(() => {
    console.log("submit form");
    if (formRef.current) {
      formRef.current.submit();
    }
  }, [txndetails]);
  return (
    <form
      ref={formRef}
      action="http://amritha.edu/api/exam/paymentsuccess"
      method="post"
    >
      <input type="hidden" name="key" value="{key}" />
      <input type="hidden" name="txnid" value={txndetails.txnid} />
      <input type="hidden" name="amount" value="10" />
      <input type="hidden" name="productinfo" value="iphone" />
      <input type="hidden" name="firstname" value="PayU Userdd" />
      <input type="hidden" name="phone" value="844748483" />
      <input type="hidden" name="email" value="test@gmail.com" />
      <input type="hidden" name="result" value="success" />
      <input
        type="hidden"
        name="surl"
        value="https://test-payment-middleware.payu.in/simulatorResponse"
      />
      <input
        type="hidden"
        name="furl"
        value="https://test-payment-middleware.payu.in/simulatorResponse"
      />
      <input
        type="hidden"
        name="hash"
        value="24766dd652435a6960967aa3fd696aa48a923836999cab4cadcd714db95ec0eef2837da8ede85cd2b8ba4e7b6023a9439a88d93700bca32f8f435964b1a321f6"
      />
    </form>
  );
};

export default PayProcessingForm;
