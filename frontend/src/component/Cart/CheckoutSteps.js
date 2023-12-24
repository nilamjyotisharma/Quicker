import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PaymentIcon from '@mui/icons-material/Payment';
import VerifiedIcon from '@mui/icons-material/Verified';

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
      details: <Typography>Enter shipping details</Typography>,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <AssignmentTurnedInIcon />,
      details: <Typography>Review and confirm</Typography>,

    },
    {
      label: <Typography>Payment</Typography>,
      icon: <PaymentIcon />,
      details: <Typography>Enter payment details</Typography>,

    },
    {
      label: <Typography>Order Placed</Typography>,
      icon: <VerifiedIcon />,
      details: <Typography>Place your order</Typography>,

    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <div className="bg-transparent">
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} className="mx-36">
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel className="bg-transparent text-start rounded-lg"
              style={{
                color: activeStep >= index ? "#2FA674" : "rgba(0, 0, 0, 0.649)",
                // backgroundColor: activeStep >= index ? "#eafdf6" : "rgba(0, 0, 0, 0.149)",
              }}

              icon={item.icon}
    
            >

            <div className=''>
              <div>
                <p className='text-2xl font-bold'>{item.label}</p>
                <p className='text-gray-500'>{item.details}</p>
              </div>
            </div>

            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default CheckoutSteps;