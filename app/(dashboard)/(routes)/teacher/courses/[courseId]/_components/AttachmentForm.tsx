"use client";

import * as z from "zod";


import { Button } from "@/components/ui/button";
import { File,  Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";

import { Attachment, Course } from "@prisma/client";

import { FileUpload } from "@/components/FileUpload";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



interface AttachmentFormProps {
  initialData: Course & {attachments : Attachment[]};
  courseId: string;
}

const formSchema = z.object({
  url : z.string().min(1)
});

export const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
    const router = useRouter();
 
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId,setDeletingId] = useState<string|null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);





  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const onDelete = async(attachmentId: string) => {
    try{
      setDeletingId(attachmentId);
      await axios.delete(`/api/courses/${courseId}/attachments/${attachmentId}`);
      toast.success("Course deleted");
      router.refresh();


    } catch(error){
      toast.error("Something went wrong");

    } finally{
      setDeletingId(null);

    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4" />
              Add a File
            </>
          )}
        
        </Button>
      </div>
      {!isEditing && (
        <>
        {
            initialData.attachments.length ===0 && (
               <p className="text-sm mt-2 text-slate-500 italic">
                No attachments yet
               </p>
            )
        }

        {initialData.attachments.length>0 && 
        <div className="space-y-2">
            {
                initialData.attachments.map((attachment)=>(
                 <div key={attachment.id}  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300">
                   <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs line-clamp-1 hover:underline"
                  >
                    {attachment.name}
                  </a>
                   {deletingId === attachment.id && (
                    <div className="ml-auto">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      title="Delete attachment"
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  

                    </div>

                ))
            }


            </div>
            }
        </>
       
        )}
      {isEditing && (
        <div>
         <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
               Add anything your students might need to complete the course.
          </div>
        </div>
      )}
    </div>
  );
};