import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { removeFiles, uploadFiles } from '../../api/product'
import usesechandStore from '../../store/sechand-store'
import { Loader } from 'lucide-react'

const Uploadfile = ({ form, setForm }) => {
    const token = usesechandStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)

    const handleOnChange = async (e) => {
        const files = e.target.files
        if (!files) return

        setIsLoading(true) // เปิดสถานะโหลดก่อนเริ่มอัปโหลด
        let uploadedImages = [...form.images] // Clone images array
        
        const uploadPromises = Array.from(files).map((file) => {
            return new Promise((resolve, reject) => {
                if (!file.type.startsWith('image/')) {
                    toast.error(`ไฟล์ ${file.name} ไม่ใช่รูปภาพ`)
                    return reject()
                }

                Resize.imageFileResizer(
                    file,
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    async (data) => {
                        try {
                            const res = await uploadFiles(token, data)
                            uploadedImages = [...uploadedImages, res.data] // สร้างอาร์เรย์ใหม่
                            resolve()
                        } catch (err) {
                            console.error("Error uploading file", err)
                            reject()
                        }
                    },
                    "base64"
                )
            })
        })

        // รอให้ทุกไฟล์อัปโหลดเสร็จ
        Promise.allSettled(uploadPromises).then(() => {
            setForm((prevForm) => ({
                ...prevForm,
                images: uploadedImages
            }))
            setIsLoading(false) // ปิดโหลดเมื่อทุกไฟล์อัปโหลดเสร็จ
            toast.success('เพิ่มรูปภาพสำเร็จ!')
        })
    }

    const handleDelete = async (public_id) => {
        try {
            await removeFiles(token, public_id)
            const updatedImages = form.images.filter((img) => img.public_id !== public_id)
            setForm((prevForm) => ({
                ...prevForm,
                images: updatedImages
            }))
            toast.error("ลบรูปภาพสำเร็จ")
        } catch (err) {
            console.log("Error deleting file", err)
        }
    }

    return (
        <div className='my-4'>
            <div className='flex mx-4 gap-6 my-6'>
            {isLoading && <p className='text-gray-500'>กำลังอัปโหลด...</p>}

                {/* Image Display */}
                {form.images.map((item, index) => (
                    <div className='relative' key={index}>
                        <img className='w-32 h-32 rounded-lg shadow-md hover:scale-105 transition duration-200 ease-in-out' src={item.url} />

                        {/* Delete Button with Animation */}
                        <span
                            onClick={() => handleDelete(item.public_id)}
                            className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 cursor-pointer 
                                    hover:bg-red-700 transform transition-transform duration-200 hover:scale-110'
                        >
                            X
                        </span>
                    </div>
                ))}
            </div>

            <div>
                <input
                    onChange={handleOnChange}
                    type='file'
                    name='images'
                    multiple
                    className='border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
            </div>
        </div>
    )
}

export default Uploadfile
