import React from 'react'
import { useForm } from 'react-hook-form';
function EditUserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <div>EditUserForm</div>
  )
}

export default EditUserForm