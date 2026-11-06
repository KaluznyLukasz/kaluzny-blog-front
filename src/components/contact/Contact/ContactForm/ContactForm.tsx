import { Button, Input, TextArea } from "@gi-org-pl/athena";
import { Send } from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import { PRIVACY_PATH } from "../../../../constants/common";
import {
  CONTACT_FORM_MESSAGES,
  CONTACT_TOPICS,
  EMPTY_CONTACT_FORM,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "./ContactForm.constants";
import type { ContactFormValues } from "./ContactForm.types";
import { buildMailtoHref } from "./utils/buildMailtoHref";
import { openMailApp } from "./utils/openMailApp";

const ContactForm = () => {
  const headingId = useId();
  const messageId = useId();
  const [values, setValues] = useState(EMPTY_CONTACT_FORM);
  const [isHandedOff, setIsHandedOff] = useState(false);

  const update = (field: keyof ContactFormValues) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openMailApp(buildMailtoHref(values));
    setIsHandedOff(true);
  };

  return (
    <form
      aria-labelledby={headingId}
      onSubmit={handleSubmit}
      className="flex h-full flex-col gap-5 rounded-4xl border border-gi-ash bg-background/90 p-6 shadow-sm sm:p-8"
    >
      <h2 id={headingId} className="font-extrabold text-2xl text-gi-primary">
        {CONTACT_FORM_MESSAGES.title}
      </h2>
      <Input
        label={CONTACT_FORM_MESSAGES.name}
        name="name"
        autoComplete="name"
        maxLength={NAME_MAX_LENGTH}
        value={values.name}
        onChange={update("name")}
        isRequired
        required
        className="focus-within:outline-2 focus-within:outline-gi-secondary focus-within:outline-offset-2"
      />
      <fieldset className="min-w-0">
        <legend className="mb-2 font-medium text-gi-primary text-sm">
          {CONTACT_FORM_MESSAGES.topic}
        </legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_TOPICS.map((topic) => (
            <label key={topic} className="relative cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={topic}
                checked={values.topic === topic}
                onChange={() => update("topic")(topic)}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-gi-ash bg-gi-ash px-3 py-1.5 font-medium text-gi-dark-gray text-sm transition-colors hover:bg-gi-dark-ash peer-checked:border-gi-primary peer-checked:bg-gi-primary peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-gi-secondary peer-focus-visible:outline-offset-2">
                {topic}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {/* The label of TextArea is plain text, not tied to the field */}
      <div>
        <label
          htmlFor={messageId}
          className="block font-medium text-gi-primary text-sm"
        >
          {CONTACT_FORM_MESSAGES.message}
          <span aria-hidden="true" className="ml-1 text-gi-red">
            *
          </span>
        </label>
        <TextArea
          id={messageId}
          name="message"
          value={values.message}
          onChange={update("message")}
          characterLimit={MESSAGE_MAX_LENGTH}
          helper={
            <span className="text-gi-dark-gray">
              {values.message.length}/{MESSAGE_MAX_LENGTH}
            </span>
          }
          required
          className="w-full focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2"
        />
      </div>
      <div className="flex flex-col items-start gap-3">
        <Button
          htmlType="submit"
          LeftIcon={<Send />}
          className="focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2 [&_svg_*]:fill-none [&_svg_*]:stroke-current"
        >
          {CONTACT_FORM_MESSAGES.submit}
        </Button>
        <p
          role="status"
          className={twMerge(
            "text-gi-dark-gray text-sm",
            isHandedOff && "font-medium text-gi-primary",
          )}
        >
          {isHandedOff
            ? CONTACT_FORM_MESSAGES.handedOff
            : CONTACT_FORM_MESSAGES.note}
        </p>
        <p className="text-gi-dark-gray text-sm">
          {CONTACT_FORM_MESSAGES.privacy}{" "}
          {/* A new tab, so the visitor does not lose what they typed */}
          <a
            href={PRIVACY_PATH}
            target="_blank"
            rel="noreferrer"
            className="rounded-sm underline underline-offset-4 transition-colors hover:text-gi-primary focus-visible:outline-2 focus-visible:outline-gi-secondary focus-visible:outline-offset-2"
          >
            {CONTACT_FORM_MESSAGES.privacyLink}
            <span className="sr-only"> {CONTACT_FORM_MESSAGES.newTab}</span>
          </a>
          .
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
