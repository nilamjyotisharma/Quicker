import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import PaymentIcon from '@mui/icons-material/Payment';
import VerifiedIcon from '@mui/icons-material/Verified';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const OrderTracking = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Order Placed</Typography>,
      icon: <TaskAltIcon />,
    },
    {
      label: <Typography>Processing</Typography>,
      icon: <SettingsSuggestIcon />,
    },
    {
      label: <Typography>Shipped</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Delivered</Typography>,
      icon: <VerifiedIcon />,

    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <div className="bg-transparent">
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles} className="">
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
              </div>
            </div>

            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracking;