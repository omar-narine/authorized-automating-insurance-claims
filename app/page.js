"use client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Switch,
} from "@heroui/react";
import { SunIcon, MoonIcon } from "@heroui/shared-icons";
import { useState } from "react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar className="bg-background/60 backdrop-blur-md border-b border-divider">
        <NavbarBrand>
          <p className="font-bold text-inherit">Insurance Claims App</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Switch
              defaultSelected={isDark}
              size="lg"
              color="secondary"
              startContent={<SunIcon />}
              endContent={<MoonIcon />}
              onValueChange={toggleDarkMode}
            >
              Dark Mode
            </Switch>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to Insurance Claims Automation
          </h1>
          <p className="text-lg text-default-500 max-w-2xl mx-auto">
            Streamline your insurance claim process with our AI-powered
            automation platform. Built with Next.js, Tailwind CSS, and HeroUI
            components.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">AI-Powered Analysis</h4>
              <Chip color="primary" variant="flat" size="sm">
                New
              </Chip>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-default-500">
                Advanced AI algorithms analyze claim documents and images for
                faster processing.
              </p>
            </CardBody>
          </Card>

          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Automated Workflow</h4>
              <Chip color="secondary" variant="flat" size="sm">
                Popular
              </Chip>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-default-500">
                Streamlined workflows that automatically route claims to the
                right departments.
              </p>
            </CardBody>
          </Card>

          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Real-time Tracking</h4>
              <Chip color="success" variant="flat" size="sm">
                Live
              </Chip>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-default-500">
                Track claim status in real-time with detailed progress updates.
              </p>
            </CardBody>
          </Card>
        </div>

        <Divider className="my-8" />

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button color="primary" size="lg" className="font-semibold">
              Get Started
            </Button>
            <Button variant="bordered" size="lg" className="font-semibold">
              View Demo
            </Button>
            <Button
              color="secondary"
              size="lg"
              variant="ghost"
              className="font-semibold"
            >
              Learn More
            </Button>
          </div>

          <div className="flex justify-center">
            <Link href="#" color="primary" className="text-sm">
              Already have an account? Sign in →
            </Link>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              HeroUI Components Working!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
