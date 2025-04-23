import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";


// Define a custom type for FormDataFile to include optional 'name' property
type FormDataFile = Blob & {
    name?: string;
};

export async function POST(request: Request) {
    try {
        // Add headers to handle multipart/form-data
        const contentType = request.headers.get("content-type");
        if (!contentType || !contentType.includes("multipart/form-data")) {
            return NextResponse.json(
                { error: "Content type must be multipart/form-data" },
                { status: 400 }
            );
        }

        const formData = await request.formData();
        const file = formData.get("file") as FormDataFile | null;
        const pathName = formData.get("pathName") as string;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }
        
        // Convert the file to an ArrayBuffer and then to a Base64 string
        const fileBuffer = await file.arrayBuffer();
        const base64File = Buffer.from(fileBuffer).toString("base64");
        
        // Upload the file to Cloudinary using the uploader.upload method
        const uploadResponse = await cloudinary.uploader.upload(
            `data:${file.type};base64,${base64File}`, // Construct the data URI for the file
            {
            folder: pathName, // Specify the folder in Cloudinary where the file will be stored
            transformation: [
                { width: 200, height: 200, crop: "fill", gravity: "face" }, // Apply transformations to the uploaded image
            ],
            }
        );
        return NextResponse.json({ url: uploadResponse.secure_url });
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        );
    }
}
