import { useRef } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function UploadCard({
  selectedFile,
  setSelectedFile,
  handleUpload,
  uploading = false,
}) {
  const inputRef = useRef(null);

  return (
    <div className="flex-1 flex items-center justify-center p-10 overflow-auto">

      <Card className="w-full max-w-5xl rounded-[32px] shadow-2xl border overflow-hidden">

        <div className="grid lg:grid-cols-2">

          {/* LEFT */}

          <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-sky-400 text-white p-14 flex flex-col justify-center">

            <Badge className="w-fit bg-white/20 text-white border-0 rounded-full">

              <Sparkles className="mr-2 w-4 h-4"/>

              AI Powered

            </Badge>

            <h1 className="text-5xl font-bold mt-8 leading-tight">

              Chat with
              <br/>
              your PDFs.

            </h1>

            <p className="mt-8 text-blue-100 leading-8">

              Upload any PDF document and ask natural language
              questions. The AI understands your files and
              gives instant answers.

            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center">

                <ShieldCheck className="mr-3"/>

                Secure Upload

              </div>

              <div className="flex items-center">

                <ShieldCheck className="mr-3"/>

                AI Powered Search

              </div>

              <div className="flex items-center">

                <ShieldCheck className="mr-3"/>

                Instant Answers

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="p-14 bg-background">

            <div
              onClick={() => inputRef.current.click()}
              className="border-2 border-dashed rounded-3xl cursor-pointer
              transition-all duration-300 hover:border-blue-500
              hover:bg-blue-500/5 p-14 flex flex-col items-center"
            >

              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">

                <UploadCloud className="w-12 h-12 text-blue-600"/>

              </div>

              <h2 className="text-3xl font-bold mt-8">

                Upload PDF

              </h2>

              <p className="text-muted-foreground mt-3 text-center">

                Drag & Drop
                <br/>

                or click to browse

              </p>

            </div>

            <input
              hidden
              ref={inputRef}
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setSelectedFile(e.target.files[0])
              }
            />

            {selectedFile && (

              <Card className="mt-8 p-5 rounded-2xl">

                <div className="flex items-center justify-between">

                  <div className="flex items-center">

                    <FileText className="text-red-500 mr-4"/>

                    <div>

                      <h3 className="font-semibold">

                        {selectedFile.name}

                      </h3>

                      <p className="text-sm text-muted-foreground">

                        Ready for upload

                      </p>

                    </div>

                  </div>

                  <CheckCircle2 className="text-green-600"/>

                </div>

              </Card>

            )}

            {selectedFile && (

              <Button
                onClick={handleUpload}
                disabled={uploading}
                size="lg"
                className="
                    mt-8
                    w-full
                    h-14
                    rounded-2xl
                    bg-blue-600
                    hover:bg-blue-700
                    hover:scale-[1.02]
                    active:scale-95
                    transition-all
                    duration-300
                    shadow-lg
                    shadow-blue-500/30
                    text-lg
                    font-semibold
                    cursor-pointer
                "
                >
                {uploading ? "Uploading and indexing..." : "Upload PDF and Start Chat"}
                </Button>

            )}

          </div>

        </div>

      </Card>

    </div>
  );
}
