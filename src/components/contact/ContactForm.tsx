import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import MagneticButton from '@/components/interactive/MagneticButton';
import { ChevronRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    projectType: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

const FormField = React.forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    {
        label: string;
        error?: string;
        textarea?: boolean;
        [key: string]: any;
    }
>(({ label, error, textarea = false, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const Component = textarea ? 'textarea' : 'input';

    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <label className="block text-sm font-mono tracking-wider text-muted-foreground mb-2">
                {label}
            </label>

            <div className="relative">
                <motion.div
                    className="absolute -inset-px rounded-sm bg-primary/20"
                    initial={false}
                    animate={{
                        opacity: isFocused ? 1 : 0,
                        scale: isFocused ? 1 : 0.95
                    }}
                    transition={{ duration: 0.2 }}
                />

                <Component
                    ref={ref as any}
                    className={`
            w-full px-4 py-3 bg-white border transition-colors
            ${error ? 'border-red-500' : 'border-black/10'}
            ${isFocused ? 'border-primary' : ''}
            focus:outline-none relative
            ${textarea ? 'h-32 resize-none' : ''}
          `}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
            </div>

            <AnimatePresence mode="wait">
                {error && (
                    <motion.span
                        className="absolute -bottom-6 left-0 text-sm text-red-500 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.div>
    );
});

FormField.displayName = 'FormField';

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    });

    const onSubmit = async (data: ContactFormData) => {
        try {
            setIsSubmitting(true);

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to submit form');

            setSubmitStatus('success');
            reset();

            setTimeout(() => setSubmitStatus(null), 5000);

        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
        >
            {/* Form loading overlay */}
            <AnimatePresence>
                {isSubmitting && (
                    <motion.div
                        className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                            <Loader2 className="w-8 h-8 text-primary" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    label="Name"
                    error={errors.name?.message}
                    {...register('name')}
                />

                <FormField
                    label="Email"
                    type="email"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <FormField
                    label="Project Type"
                    placeholder="Optional"
                    {...register('projectType')}
                />

                <FormField
                    label="Message"
                    error={errors.message?.message}
                    textarea
                    {...register('message')}
                />

                <motion.div layout>
                    <MagneticButton
                        type="submit"
                        className="px-8 py-4 bg-black text-white text-lg w-full justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                Sending
                                <Loader2 className="w-5 h-5 animate-spin" />
                            </>
                        ) : (
                            <>
                                Send Message
                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </MagneticButton>
                </motion.div>
            </form>

            {/* Notification Toast */}
            <AnimatePresence>
                {submitStatus && (
                    <motion.div
                        className={`fixed bottom-8 right-8 p-4 rounded-lg shadow-lg flex items-center gap-3 ${
                            submitStatus === 'success'
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                        }`}
                        initial={{ opacity: 0, y: 50, x: 50 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 50, x: 50 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    >
                        {submitStatus === 'success' ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Message sent successfully!</span>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="w-5 h-5" />
                                <span>Failed to send message. Please try again.</span>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}