import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import useSetting from "./useSetting";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {}, // Destructuring nested object
  } = useSetting();

  const { isUpdating, updateSetting } = useUpdateSetting();

  const handleUpdate = (e, field) => {
    const { value } = e.target; // Lấy giá trị từ input
    if (!value) return; // Nếu không có giá trị thì không làm gì cả
    updateSetting({ [field]: value }); // Gọi hàm updateSetting với object chứa field là giá trị mới, field là 1 trường,
    // VD: const a = {"minBookingLength": 3, "maxBookingLength": 10}
    // Để gán giá trị mới cho field, ta sử dụng a["minBookingLength"] = 5
  };
  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")} // Khi input mất focus, gọi hàm handleUpdate với tham số là event và field cần update
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
