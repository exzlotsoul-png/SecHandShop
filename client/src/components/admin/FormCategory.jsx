import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import usesechandStore from '../../store/sechand-store'
import { toast } from 'react-toastify'
import { Trash } from 'lucide-react'

const FormCategory = () => {
    const token = usesechandStore((state) => state.token)
    const [name, setName] = useState('')
    const categories = usesechandStore((state) => state.categories)
    const getCategory = usesechandStore((state) => state.getCategory)

    useEffect(() => {
        getCategory(token)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name) {
            return toast.warning('กรุณากรอกข้อมูล')
        }
        try {
            const res = await createCategory(token, { name })
            toast.success(`เพิ่มหมวดหมู่ ${res.data.name} สำเร็จ`)
            getCategory(token)
        } catch (err) {
            console.log(err)
            toast.error('เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่')
        }
    }

    const handleRemove = async (id) => {
        if (window.confirm('คุณต้องการลบหมวดหมู่นี้ใช่หรือไม่?')) {
            try {
                const res = await removeCategory(token, id)
                toast.success(`ลบหมวดหมู่ ${res.data.name} สำเร็จ`)
                getCategory(token)
            } catch (err) {
                console.log(err)
                toast.error('เกิดข้อผิดพลาดในการลบหมวดหมู่')
            }
        }
    }

    return (
        <div className='container mx-auto p-6 bg-white shadow-xl rounded-lg border border-[#A9B5DF]'>
            <h1 className="text-2xl font-semibold mb-4 text-[#2D336B]">จัดการหมวดหมู่</h1>
            
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex gap-4">
                    <div className="relative w-full">
                        <input
                            className="border border-[#A9B5DF] p-3 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-[#7886C7] text-[#2D336B] hover:border-[#2D336B] transition duration-200"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="category-name"
                            type="text"
                            placeholder="ชื่อหมวดหมู่"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#2D336B] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#7886C7] transition duration-200"
                    >
                        เพิ่มหมวดหมู่
                    </button>
                </div>
            </form>

            <hr className="my-4 border-[#A9B5DF]" />

            <h2 className="text-xl font-semibold mb-4 text-[#2D336B]">รายการหมวดหมู่</h2>
            <ul className="list-none">
                {
                    categories.map((item, index) =>
                        <li key={item.id} className="flex justify-between items-center py-3 border-b border-[#A9B5DF] hover:bg-[#F1F5FF] transition duration-200">
                            <span className="text-lg text-[#2D336B]">{item.name}</span>
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
                            >
                                <Trash />
                            </button>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default FormCategory
