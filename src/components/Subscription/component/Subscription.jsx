import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPlan,
  toggleAddOn,
  updateCard,
  updateCardImage,
  setStep,
} from "../../../store/slices/formSlice";
import PlanCard from "../PlanCard/PlanCard";
import AddOnCard from "../AddOnCard/AddOnCard";
import { FaCreditCard, FaCamera, FaCheck } from "react-icons/fa";
import "./Subscription.scss";

import iconPin from "../../../assets/e.svg";
import iconSpeedo from "../../../assets/Group-5171.svg";
import iconLock from "../../../assets/Lock.svg";

const Subscription = () => {
  const dispatch = useDispatch();
  const { plan, addOns, cardDetails } = useSelector((state) => state.form);
  const [cardNumber, setCardNumber] = useState(cardDetails.number || "");
  const [expiry, setExpiry] = useState(cardDetails.expiry || "");
  const [cvc, setCvc] = useState(cardDetails.cvc || "");
  const [cardName, setCardName] = useState(cardDetails.name || "");
  const [previewImage, setPreviewImage] = useState(
    cardDetails.cardImage || null
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(setPlan(null));

    Object.keys(addOns).forEach((addOn) => {
      if (addOns[addOn]) {
        dispatch(toggleAddOn(addOn));
      }
    });
  }, [dispatch]);

  const plansData = [
    {
      id: "just_mates",
      title: "Just mates",
      price: "Free",
      features: [
        { icon: iconPin, text: "Bring your own GPS" },
        { icon: iconSpeedo, text: "Mileage reporting to be done by you" },
        { icon: iconLock, text: "In-person key handover to guests" },
      ],
      popular: false,
    },
    {
      id: "good_mates",
      title: "Good mates",
      price: "$10",
      features: [
        { icon: iconPin, text: "Primary GPS included" },
        { icon: iconSpeedo, text: "Automated mileage calculations" },
        { icon: iconLock, text: "In-person key handover to guests" },
      ],
      popular: true,
    },
    {
      id: "best_mates",
      title: "Best mates",
      price: "$30",
      features: [
        { icon: iconLock, text: "Keyless access technology" },
        { icon: iconSpeedo, text: "Automated mileage calculations" },
        { icon: iconLock, text: "Remote handover to guests" },
      ],
      popular: false,
    },
  ];

  const getAddOns = () => {
    if (!plan) return [];

    switch (plan) {
      case "just_mates":
        return [
          {
            id: "gps",
            label: "BYO secondary GPS - $5/month",
            isComingSoon: false,
            price: 5,
          },
        ];
      case "good_mates":
        return [
          {
            id: "gps",
            label: "BYO secondary GPS - $5/month",
            isComingSoon: false,
            price: 5,
          },
          {
            id: "lockbox",
            label: "BYO lock box - $10/month",
            isComingSoon: false,
            price: 10,
          },
        ];
      case "best_mates":
        return [
          {
            id: "gps",
            label: "BYO secondary GPS - $5/month",
            isComingSoon: false,
            price: 5,
          },
          {
            id: "insurance",
            label: "Between trip insurance",
            isComingSoon: true,
            price: 0,
          },
        ];
      default:
        return [];
    }
  };

  const hasSelectedAddOn = getAddOns().some(
    (addon) => !addon.isComingSoon && addOns[addon.id]
  );

  const showCardDetails = plan && (plan !== "just_mates" || hasSelectedAddOn);

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCardNumber(value);
    dispatch(updateCard({ number: value }));
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value;

    let formattedValue = value.replace(/\D/g, "");
    if (formattedValue.length > 2) {
      formattedValue =
        formattedValue.substring(0, 2) + "/" + formattedValue.substring(2, 4);
    }
    setExpiry(formattedValue);
    dispatch(updateCard({ expiry: formattedValue }));
  };

  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvc(value);
    dispatch(updateCard({ cvc: value }));
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setCardName(value);
    dispatch(updateCard({ name: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setPreviewImage(base64Image);
        dispatch(updateCardImage(base64Image));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Card details submitted:", {
      cardNumber,
      expiry,
      cvc,
      cardName,
      previewImage,
    });

    dispatch(setStep(2));
  };

  const isFormValid =
    cardNumber.length >= 16 &&
    expiry.length === 5 &&
    cvc.length >= 3 &&
    cardName.trim() !== "" &&
    previewImage !== null;

  return (
    <div className="subscription-container">
      <h2 className="page-title">Subscription plan</h2>
      <p className="page-subtitle">
        Select the ideal subscription plan for your listing.
      </p>

      <div className="plans-grid">
        {plansData.map((p) => (
          <PlanCard
            key={p.id}
            title={p.title}
            price={p.price}
            features={p.features}
            isSelected={plan === p.id}
            isPopular={p.popular}
            onClick={() => dispatch(setPlan(p.id))}
          />
        ))}
      </div>

      {plan && (
        <div className="addons-section">
          <h3 className="section-label">
            Select add-ons for your subscription
          </h3>
          <div className="addons-grid">
            {getAddOns().map((addOn) => (
              <AddOnCard
                key={addOn.id}
                label={addOn.label}
                isSelected={addOns[addOn.id]}
                onToggle={() => dispatch(toggleAddOn(addOn.id))}
                isComingSoon={addOn.isComingSoon}
              />
            ))}
          </div>
        </div>
      )}

      {showCardDetails && (
        <div className="card-details-section">
          <h3 className="section-label">Add card details</h3>
          <div className="card-input-box">
            <FaCreditCard className="card-icon" />
            <input
              type="text"
              placeholder="1234 5678 1234 5678"
              className="input-number"
              value={cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
              onChange={handleCardNumberChange}
              maxLength={19}
            />
            <input
              type="text"
              placeholder="MM/YY"
              className="input-date"
              value={expiry}
              onChange={handleExpiryChange}
              maxLength={5}
            />
            <input
              type="text"
              placeholder="CVC"
              className="input-cvc"
              value={cvc}
              onChange={handleCvcChange}
              maxLength={4}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <p className="card-disclaimer">
            You will not be charged right now. Subscription will only start once
            your listing is published and live.
          </p>
        </div>
      )}

      <div className="footer-info">
        Learn more about the plans here -{" "}
        <span className="link-teal">What is the right plan for me?</span>
        <br />
        You will be able to switch between plans easily later as well. Speak to
        our host success team if you need any clarifications.
      </div>
    </div>
  );
};

export default Subscription;
