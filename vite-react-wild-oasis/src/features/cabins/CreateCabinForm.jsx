import styled from "styled-components";
import { useForm } from "react-hook-form"; // import hook form từ thư viện react-hook-form

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  // Lấy ra register, hàm handleSubmit, hàm reset dữ liệu form, hàm getValues để lấy giá trị từ body input và biến formSate để bắt lỗi từ từ hook form
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState; // Lấy ra errors từ formState để hiển thị lỗi khi validate form
  const queryClient = useQueryClient(); // Lấy ra queryClient từ react-query để invalidate cache sau khi tạo cabin thành công
  const { isPending, mutate } = useMutation({
    // Lấy ra isPending và mutate từ hook useMutation để xử lý việc tạo cabin
    mutationFn: createCabin, // Hàm tạo cabin
    onSuccess: () => {
      // Hàm chạy khi tạo cabin thành công
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries("cabins"); // Invalidate cache của query "cabins" để load lại dữ liệu mới
      reset(); // Reset lại form
    },
    onError: (err) => {
      // Hàm chạy khi có lỗi xảy ra
      toast.error("An error occurred: " + err.message); // Hiển thị thông báo lỗi
    },
  });
  /*
    register: dùng để đăng ký các input, select, textarea để lấy dữ liệu từ form cho vào body request, register cũng có sẵn các rules để validate dữ liệu (onChange, name, value, ref, onBlur, ...)
    handleSubmit: dùng để xử lý sự kiện submit của form, nó sẽ gọi hàm onSubmit mà chúng ta truyền vào với dữ liệu của form
  */
  const onSubmit = (data) => {
    mutate(data); // Gọi hàm mutate để tạo cabin với dữ liệu data từ form, mutate sẽ gọi createCabin(data)
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", {
            required: "Cabin name is required", // Bắt buộc nhập, nếu không nhập sẽ hiển thị thông báo lỗi này
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}{" "}
        {/* Hiển thị thông báo lỗi nếu có */}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            required: "Maximum capacity is required", // Bắt buộc nhập, nếu không nhập sẽ hiển thị thông báo lỗi này
            min: {
              value: 1, // Giá trị nhỏ nhất là 1
              message: "Minimum capacity is 1", // Hiển thị thông báo lỗi khi giá trị nhỏ hơn 1
            },
          })}
        />
        {errors?.maxCapacity?.message && (
          <Error>{errors.maxCapacity.message}</Error>
        )}{" "}
        {/* Hiển thị thông báo lỗi nếu có */}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          {...register("regularPrice", {
            required: "Regular price is required", // Bắt buộc nhập, nếu không nhập sẽ hiển thị thông báo lỗi này
          })}
        />
        {errors?.regularPrice?.message && (
          <Error>{errors.regularPrice.message}</Error>
        )}{" "}
        {/* Hiển thị thông báo lỗi nếu có */}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isPending}
          {...register("discount", {
            required: "Discount is required", // Bắt buộc nhập, nếu không nhập sẽ hiển thị thông báo lỗi này
            validate: (value) =>
              Number(getValues("regularPrice")) >= Number(value) ||
              "Discount must be less than regular price", // Giảm giá phải nhỏ hơn giá gốc, nếu không sẽ hiển thị thông báo lỗi này
          })}
        />
        {errors?.discount?.message && <Error>{errors.discount.message}</Error>}{" "}
        {/* Hiển thị thông báo lỗi nếu có */}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          disabled={isPending}
          defaultValue=""
          {...register("description", {
            required: "Description is required", // Bắt buộc nhập, nếu không nhập sẽ hiển thị thông báo lỗi này
          })}
        />
        {errors?.description?.message && (
          <Error>{errors.description.message}</Error>
        )}{" "}
        {/* Hiển thị thông báo lỗi nếu có */}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: "Image is required", // Bắt buộc nhập, nếu không nhập sẽ hiển thị thông báo lỗi này
          })}
        />
        {errors?.image?.message && <Error>{errors.image.message}</Error>}{" "}
        {/* Hiển thị thông báo lỗi nếu có */}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isPending ? "Creating..." : "Create Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
