"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Check, Target, BookOpen, Trophy } from "lucide-react";
import HeroSection from '@/components/ui/HeroSection';

export default function Home() {

  const benefitGroups = [
    {
      icon: <BookOpen className="w-12 h-12 text-black" />,
      title: "Students",
      description: "Prepare for technical, behavioral, and industry-specific interviews"
    },
    {
      icon: <Target className="w-12 h-12 text-black" />,
      title: "Career Changers",
      description: "Build confidence and master interview skills across different domains"
    },
    {
      icon: <Trophy className="w-12 h-12 text-black" />,
      title: "Professionals",
      description: "Upgrade your interviewing techniques and stay competitive in the job market"
    }
  ];

  return (
    <div className="min-h-screen bg-white -mt-20">

      <HeroSection />

      {/* Who Can Benefit Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto text-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Who Can Benefit?</h2>
            <p className="text-gray-600 mt-4">Our AI interview coach is designed for everyone seeking to excel</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefitGroups.map((group, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardHeader className="flex items-center">
                  {group.icon}
                  <CardTitle className="mt-4">{group.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{group.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
          <p className="text-xl mb-8 text-gray-300">Start your journey to interview mastery today</p>
          <a href="/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"> Sign In Now </a>
        </div>
      </section>
    </div>
  );
}