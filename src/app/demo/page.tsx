"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

type PredictionResponse = {
  prediction: string;
  probabilities: {
    [key: string]: number;
  };
};

// Mapping for user-friendly display labels
const PREDICTION_LABELS: Record<string, string> = {
  lung_wheeze: "Asthma/COPD",
  lung_crackle: "Pneumonia",
  heart_murmur: "Valve Disorder",
  lung_normal: "Normal lung",
  heart_normal: "Normal heart",
};

export default function DemoPage() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Prediction failed");
      }

      setResult(data);
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

  // Sort probabilities from highest to lowest
  const sortedProbabilities = result
    ? Object.entries(result.probabilities).sort(([, a], [, b]) => b - a)
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
              Upload a WAV audio file of a heartbeat. The model will analyze it
              and predict the likelihood of Normal, Pneumonia, or TB conditions.
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

            {result && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Main Prediction Banner */}
                <div className="bg-secondary/50 rounded-lg p-6 text-center mb-6 border border-primary/20">
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                    Primary Diagnosis
                  </h3>
                  <p className="text-2xl md:text-3xl font-bold text-primary">
                    {/* Use the mapping, fallback to formatted string if missing */}
                    {PREDICTION_LABELS[result.prediction] ||
                      result.prediction.replace(/_/g, " ")}
                  </p>
                </div>

                {/* Detailed Probabilities */}
                <h3 className="text-lg font-semibold mb-4">
                  Detailed Analysis
                </h3>
                <div className="space-y-4">
                  {sortedProbabilities.map(([label, value]) => {
                    // Convert 0-1 decimal to 0-100 percentage
                    const percentage = value * 100;
                    return (
                      <div key={label}>
                        <div className="flex justify-between mb-2">
                          <span className="text-base font-medium text-foreground capitalize">
                            {label.replace(/_/g, " ")}
                          </span>
                          <span className="text-sm font-medium text-foreground">
                            {percentage.toFixed(2)}%
                          </span>
                        </div>
                        <Progress value={percentage} className="w-full h-2" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
