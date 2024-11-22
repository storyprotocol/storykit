"use client"

import React from "react";
import { useForm } from "react-hook-form";
import { LicenseFlavorSelector, PIL_FLAVOR } from "@storyprotocol/storykit"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface FormValues {
  projectName: string;
  pilFlavor: PIL_FLAVOR;
}

export default function PILFlavorForm() {
  const form = useForm<FormValues>({
    defaultValues: {
      projectName: "",
      pilFlavor: PIL_FLAVOR.NON_COMMERCIAL_SOCIAL_REMIXING,
    },
  });

  const onSubmit = (data: FormValues) => {
    alert(data.pilFlavor)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Project License Setup</h1>
          <p className="text-muted-foreground">
            Configure the licensing terms for your project
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pilFlavor"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LicenseFlavorSelector
                      value={field.value}
                      onValueChange={field.onChange}
                      showCans={true}
                      showCannots={true}
                      showExtras={true}
                      size="small"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <button type="submit" className="rounded-md bg-gray-800 text-gray-50 hover:bg-gray-900 h-10 px-4 py-2 text-sm font-medium">
              Save License Configuration
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}