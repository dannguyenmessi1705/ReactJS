import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import useCheckin from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import useSetting from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSetting } = useSetting();
  const moveBack = useMoveBack();
  const [isConfirmed, setConfirmed] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  useEffect(() => setConfirmed(booking?.isPaid || false), [booking]);

  if (isLoading || isLoadingSetting) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  const optionBreakfastPrice = settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!isConfirmed) return;
    if (addBreakfast) {
      checkin({
        bookingId,
        bookings: { extrasPrice: optionBreakfastPrice, hasBreakfast: true },
      });
    } else {
      checkin({ bookingId, bookings: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={addBreakfast}
          id="breakfastt"
          disabled={isCheckingIn}
          onChange={() => {
            setAddBreakfast((addBreakfast) => !addBreakfast);
            setConfirmed(false);
          }}
        >
          Want to add breakfast for {formatCurrency(optionBreakfastPrice)}
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          checked={isConfirmed}
          id="confirm"
          disabled={isConfirmed}
          onChange={() => setConfirmed((confirmed) => !confirmed)}
        >
          I confirmed that {guests.fullName} has paid the total amount{" "}
          {formatCurrency(
            addBreakfast ? totalPrice + optionBreakfastPrice : totalPrice
          )}{" "}
          {addBreakfast
            ? `(${formatCurrency(totalPrice)} + ${formatCurrency(
                optionBreakfastPrice
              )})`
            : ""}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!isConfirmed || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
