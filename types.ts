
import React from 'react';

export interface SlideElement {
  id: string;
  type: 'title' | 'subtitle' | 'body' | 'image' | 'button' | 'logo';
  content: string;
  style: React.CSSProperties;
}

export interface Slide {
  id: string;
  backgroundType: 'color' | 'image';
  backgroundColor: string;
  primaryColor: string;   // اللون الأساسي (العناوين، الأيقونات)
  secondaryColor: string; // اللون الثانوي (الأزرار، الأشرطة)
  textColor: string;      // لون النصوص الرئيسية
  backgroundImage?: string;
  elements: SlideElement[];
}

export interface Carousel {
  title: string;
  slides: Slide[];
}
