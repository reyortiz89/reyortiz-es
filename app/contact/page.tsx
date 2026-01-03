/**
 * Contact page
 */
"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Check, AlertCircle } from "lucide-react";
import { Container, Section, Card, Button } from "@/components";
import { profile } from "@/data/profile";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <>
      {/* Hero Section */}
      <Section size="lg" className="pt-20 pb-12 bg-slate-50 border-b border-slate-200">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">Get in Touch</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Have a project in mind or want to discuss how we can work together? I&apos;d love to hear
              from you.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Cards */}
      <Section size="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Email */}
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-3 bg-slate-100 rounded-lg">
                  <Mail size={24} className="text-slate-900" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                  <a
                    href={`mailto:${profile.identity.email}`}
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {profile.identity.email}
                  </a>
                </div>
              </div>
            </Card>

            {/* Phone */}
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-3 bg-slate-100 rounded-lg">
                  <Phone size={24} className="text-slate-900" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                  <a
                    href={`tel:${profile.identity.phone.replace(/\s+/g, "")}`}
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {profile.identity.phone}
                  </a>
                </div>
              </div>
            </Card>

            {/* Location */}
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-3 bg-slate-100 rounded-lg">
                  <MapPin size={24} className="text-slate-900" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Location</h3>
                  <p className="text-slate-600">{profile.identity.location}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Note about communication */}
          <Card className="bg-blue-50 border-blue-200 mb-12">
            <p className="text-blue-900">
              <strong>Prefer WhatsApp or Email?</strong> Reach out directly using the contact details above. I
              respond to all inquiries within 24 hours.
            </p>
          </Card>
        </Container>
      </Section>

      {/* Contact Form */}
      <Section size="lg" className="bg-slate-50">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Send me a message</h2>

            {submitted && (
              <Card className="bg-green-50 border-green-200 mb-6">
                <div className="flex items-start gap-3">
                  <Check size={24} className="text-green-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-900 mb-1">Message sent successfully!</h3>
                    <p className="text-green-800">
                      Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {error && (
              <Card className="bg-red-50 border-red-200 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle size={24} className="text-red-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-red-900 mb-1">Error</h3>
                    <p className="text-red-800">{error}</p>
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-bold text-slate-900 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-bold text-slate-900 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-slate-900 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
