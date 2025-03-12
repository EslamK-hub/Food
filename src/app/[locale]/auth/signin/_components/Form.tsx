"use client";

import FormFields from "@/components/form-fields/form-fields";
import { Button } from "@/components/ui/button";
import { Pages } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";

export default function Form() {
    const { getFormFields } = useFormFields({
        slug: Pages.LOGIN,
        translations: {},
    });
    return (
        <form>
            {getFormFields().map((field: IFormField) => (
                <div key={field.name} className="mb-3">
                    <FormFields {...field} error={{}} />
                </div>
            ))}
            <Button type="submit" className="w-full">
                Login
            </Button>
        </form>
    );
}
