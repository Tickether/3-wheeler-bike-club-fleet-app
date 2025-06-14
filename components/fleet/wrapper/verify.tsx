"use client"


import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerDescription } from "@/components/ui/drawer"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { CloudUpload, Ellipsis, Paperclip } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FileUploader, FileUploaderContent, FileUploaderItem, FileInput } from "@/components/ui/file-upload"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

  


const FormSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    othername: z.string(),
    email: z.string().email(),
    id: z.string(),
    files: z.string()
})


export function Verify() {

  const [files, setFiles] = useState < File[] | null > (null);
  const [maxFiles, setMaxFiles] = useState<number | null>(null);
  console.log(maxFiles);
  
  const form = useForm < z.infer < typeof FormSchema >> ({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: undefined,
      lastname: undefined,
      othername: undefined,
      email: undefined,
      id: undefined,
      files: undefined,
    },

  })

  function onSubmit(values: z.infer < typeof FormSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
          <Button className="max-w-fit h-12 rounded-2xl">
              Complete KYC
              {/** <PersonStanding className="text-yellow-600" /> */}
          </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full">
        <div className="mx-auto w-full max-w-sm pb-6">
          <DrawerHeader>
              <DrawerTitle>
                  Verify Your Identity
              </DrawerTitle>
              <DrawerDescription className="max-md:text-[0.9rem]">{"Enter Full Name, Scan & Upload your ID."}</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                      <FormItem>
                          <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                              <FormLabel className="text-yellow-600">First Name</FormLabel>
                              <FormControl >
                                  <Input disabled={ true } className="col-span-3" placeholder={""} {...field} />
                              </FormControl>
                          </div>
                      </FormItem>
                  )}
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                <FormLabel className="text-yellow-600">Last Name</FormLabel>
                                <FormControl >
                                    <Input disabled={ true } className="col-span-3" placeholder={""} {...field} />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="othername"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                <FormLabel className="text-yellow-600">Other Name</FormLabel>
                                <FormControl >
                                    <Input disabled={ true } className="col-span-3" placeholder={""} {...field} />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                <FormLabel className="text-yellow-600">Email</FormLabel>
                                <FormControl >
                                    <Input disabled={ true } className="col-span-3" placeholder={""} {...field} />
                                </FormControl>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                      <FormItem>
                          <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                              <FormLabel className="text-yellow-600">ID</FormLabel>
                              {
                                  !false
                                  ?(
                                      <>
                                          <Select 
                                            onValueChange={(value) => {
                                              field.onChange(value);
                                              // Set maxFiles based on the ID type
                                              if (value === "passport") {
                                                setMaxFiles(1); // Only front needed
                                              } else if (value === "national") {
                                                setMaxFiles(2); // Front and back needed
                                              }
                                            }}
                                    
                                            defaultValue={field.value}
                                          >
                                              <FormControl>
                                              <SelectTrigger className="col-span-3">
                                                  <SelectValue placeholder="Select an ID Type" />
                                              </SelectTrigger>
                                              </FormControl>
                                              <SelectContent className="col-span-3">
                                                  <SelectItem value="passport">Passport</SelectItem>
                                                  <SelectItem value="national">National ID</SelectItem>
                                              </SelectContent>
                                          </Select>
                                      </>
                                  )
                                  :(
                                      <>
                                          <FormControl>
                                              <Input disabled className="col-span-3" placeholder={""} {...field} />
                                          </FormControl>
                                      </>
                                  )
                              }
                          </div>
                      </FormItem>
                  )}
                />
                {
                  maxFiles && ( 
                    <>
                      <FormField
                        control={form.control}
                        name="files"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-yellow-600">Upload ID <span className="text-xs text-muted-foreground">(must be under 1MB)</span></FormLabel>
                            <FormControl>
                              <FileUploader
                                value={files}
                                onValueChange={setFiles}
                                dropzoneOptions={{
                                  maxFiles: maxFiles,
                                  maxSize: 1024 * 1024 * 1,
                                  multiple: true,
                                  accept: {
                                    "image/*": [".png", ".jpg", ".jpeg"],
                                  },
                                }}
                                className="relative bg-background rounded-lg p-2"
                              >
                                <FileInput
                                  id="fileInput"
                                  className="outline-dashed outline-1 outline-slate-500"
                                >
                                  <div className="flex items-center justify-center flex-col p-8 w-full ">
                                    <CloudUpload className='text-gray-500 w-10 h-10' />
                                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">Click to upload </span>
                                      or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      PNG, JPG or JPEG
                                    </p>
                                  </div>
                                </FileInput>
                                <FileUploaderContent>
                                  {files &&
                                    files.length > 0 &&
                                    files.map((file, i) => (
                                      <FileUploaderItem key={i} index={i}>
                                        <Paperclip className="h-4 w-4 stroke-current" />
                                        <span>{file.name}</span>
                                      </FileUploaderItem>
                                    ))}
                                </FileUploaderContent>
                              </FileUploader>
                            </FormControl>
                            <FormDescription className="text-xs text-muted-foreground text-center">{maxFiles === 1 ? "Upload the Front Photo of your Passport" : "Upload the Front and Back of your National ID"}</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </> 
                  )
                }
                <div className="flex justify-between">
                    <Button
                        className="w-36"
                        disabled={true}
                        type="submit"
                    >
                        {
                            false
                            ? (
                                <>
                                    <motion.div
                                    initial={{ rotate: 0 }} // Initial rotation value (0 degrees)
                                    animate={{ rotate: 360 }} // Final rotation value (360 degrees)
                                    transition={{
                                        duration: 1, // Animation duration in seconds
                                        repeat: Infinity, // Infinity will make it rotate indefinitely
                                        ease: "linear", // Animation easing function (linear makes it constant speed)
                                    }}
                                >
                                        <Ellipsis/>
                                    </motion.div>
                                </>
                            )
                            : (
                                <>
                                    Save changes
                                </>
                            )
                        }
                    </Button>
                </div>
              </form>
            </Form>
          </div>              
        </div>
      </DrawerContent>
    </Drawer>
  );
}