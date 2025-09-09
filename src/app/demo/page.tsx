"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

type PredictionResult = {
  [key: string]: number;
};

export default function DemoPage() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Prediction failed");
      }

      setPrediction(result);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const sortedPredictions = prediction
    ? Object.entries(prediction).sort(([, a], [, b]) => b - a)
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full bg-background/20 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Go to homepage">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
              <img
                src="/co-log.png"
                className="h-10 w-10 object-contain"
                alt="Coeur AI Logo"
              />
            </div>
            <span className="text-xl font-bold text-foreground">Coeur AI</span>
          </Link>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Try the Coeur AI Demo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Upload a WAV audio file of a heartbeat. The model will
              analyze it and predict the likelihood of Normal, Pneumonia, or TB
              conditions.
            </p>
            <div className="flex flex-col gap-4">
              <Input
                type="file"
                accept=".wav"
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={isLoading}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Upload Audio File"}
              </Button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {prediction && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Prediction Results:
                </h3>
                <div className="space-y-3">
                  {sortedPredictions.map(([label, value]) => (
                    <div key={label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-foreground">
                          {label}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {value.toFixed(2)}%
                        </span>
                      </div>
                      <Progress value={value} className="w-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
