import React from 'react'
import { useForm } from 'react-hook-form';
function Test() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // data.image 將是base64編碼的圖像數據
    // 使用Fetch API上傳圖片
    const formData = new FormData();
    formData.append('image', data.image[0]); // 將文件對象添加到FormData
    fetch('https://camera.moonshot.today/gen', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(responseData => {
      console.log(responseData);
    })
    .catch(error => {
      console.error(error);
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register("image", { required: true })} />
      {errors.image && <span>This field is required</span>}
      <button type="submit" className='bg-zinc-600 p-2'>Submit</button>
    </form>
  )
}

export default Test