"use client";

import { InputTypes, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { Translations } from "@/types/translations";
import { Session } from "next-auth";
import Image from "next/image";
import FormFields from "../form-fields/form-fields";
import { IFormField } from "@/types/app";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import Checkbox from "../form-fields/checkbox";
import { ValidationErrors } from "@/validations/auth";
import updateProfile from "./_actions/profile";

export default function EditUserForm({
    translations,
    user,
}: {
    translations: Translations;
    user: Session["user"];
}) {
    const session = useSession();
    const { getFormFields } = useFormFields({
        slug: Routes.PROFILE,
        translations,
    });

    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
        if (value !== null && value !== undefined && key !== "image") {
            formData.append(key, value.toString());
        }
    });

    const initialState: {
        message?: string;
        error?: ValidationErrors;
        status?: number | null;
        formData?: FormData | null;
    } = {
        message: "",
        error: {},
        status: null,
        formData,
    };

    const [state, action, pending] = useActionState(
        updateProfile.bind(null, isAdmin),
        initialState
    );
    return (
        <form className="flex flex-col md:flex-row gap-10">
            <div className="group relative w-[200px] h-[200px] overflow-hidden rounded-full mx-auto">
                <Image
                    src={user.image as string}
                    alt={user.name}
                    width={200}
                    height={200}
                    className="rounded-full object-cover"
                />
            </div>
            <div className="flex-1">
                {getFormFields().map((field: IFormField) => {
                    return (
                        <div key={field.name} className="mb-3">
                            <FormFields
                                {...field}
                                // defaultValue={fieldValue as string}
                                error={{}}
                                readOnly={field.type === InputTypes.EMAIL}
                            />
                        </div>
                    );
                })}
                {session.data?.user.role === UserRole.ADMIN && (
                    <div className="flex items-center gap-2 my-4">
                        <Checkbox
                            name="admin"
                            checked={isAdmin}
                            onClick={() => setIsAdmin(!isAdmin)}
                            label="Admin"
                        />
                    </div>
                )}
                <Button type="submit" className="w-full">
                    {translations.save}
                </Button>
            </div>
        </form>
    );
}
