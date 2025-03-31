'use client';

import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/ui/navbar';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center max-h-100vh"
            >
                <Card className="max-w-2xl sm:w-full w-[90vw] p-6 bg-white shadow-lg rounded-2xl border border-gray-300 mt-3">
                    <CardContent>
                        <h1 className="text-3xl font-bold mb-4 text-center">About PDphilE</h1>
                        <p className="text-lg text-gray-700 text-left">
                            PDphilE is a powerful and intuitive tool designed to merge multiple PDF files seamlessly.
                            Whether you need to combine reports, contracts, or study materials, PDphilE makes the
                            process effortless and efficient. With a focus on speed, simplicity, and privacy, our
                            tool ensures that your files remain secure while providing a smooth user experience.
                        </p>
                        <p className="mt-4 text-lg text-gray-700 text-left">
                            Built using Next.js, PDphilE leverages modern web technologies to deliver a fast and
                            reliable PDF merging solution. Try it out and streamline your document management today!
                        </p>
                        <div className='flex justify-end items-center sm:px-4 px-0 gap-1 mb-3 pt-6 '>
                            <span>Created By</span><a className='cursor-pointer underline' href="https://github.com/subhk02" target="_blank">Subham</a>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </>
    );
}
