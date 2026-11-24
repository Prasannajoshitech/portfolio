import type { BlogPost } from "./index";

export const accessibleReactForms: BlogPost = {
  slug: "accessible-react-forms",
  title: "Accessible React Forms: Labels, Errors, and Focus That Users Notice",
  description: "Build React forms that work with keyboards and screen readers: real labels, linked error messages, focus on submit, and a reusable TypeScript field.",
  excerpt: "Most form accessibility bugs come from three places: missing labels, errors nobody announces, and focus that goes nowhere. Here is how I fix each in React.",
  coverImage: "/blog/covers/accessible-forms.svg",
  coverAlt: "Dark cover graphic with the title Accessible React Forms",
  tags: ["React", "Accessibility", "Forms", "TypeScript"],
  datePublished: "2026-02-05",
  dateModified: "2026-02-24",
  readingTimeMinutes: 9,
  tldr: "Use a real label for every input, link hints and errors with aria-describedby, set aria-invalid only after validation, move focus to the first invalid field (or an error summary) on submit, and wrap it all in one typed Field component so the pattern is hard to get wrong.",
  content: `## Forms are where accessibility actually bites

Marketing pages can get away with a few rough edges. Forms can't. If someone can't sign up, check out or send a contact message, you've lost them, and often they won't tell you why.

Most of the broken forms I audit fail in the same three places: the inputs have no real label, errors appear visually but nobody is told about them, and focus ends up nowhere after a failed submit. None of these need a library. They need a few HTML attributes used consistently.

## Start with a real label

A placeholder is not a label. It disappears when the user types, has poor contrast by default, and is not reliably announced as a name. Use a \`<label>\` tied to the input with \`htmlFor\` and \`id\`.

\`\`\`tsx
<label htmlFor="email">Email address</label>
<input id="email" name="email" type="email" autoComplete="email" />
\`\`\`

In React, hard-coded ids collide when a component renders twice. \`useId\` solves that and is stable across server and client rendering:

\`\`\`tsx
import { useId } from "react";

function EmailField() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Email address</label>
      <input id={id} name="email" type="email" autoComplete="email" />
    </>
  );
}
\`\`\`

Two small details that pay off immediately: set the right \`type\` (so mobile keyboards and browser validation help), and set \`autoComplete\`. Autofill is an accessibility feature for anyone who finds typing hard.

If a visible label genuinely doesn't fit the design, such as a search box next to a button, hide it visually with Tailwind's \`sr-only\` class (or an equivalent) but keep it in the DOM. Don't remove it.

## Hints and errors belong to the input

Visually, an error sits under its field. Programmatically, nothing connects them unless you do it. \`aria-describedby\` points the input at the elements that describe it, and screen readers read those after the label.

\`\`\`tsx
<input
  id={id}
  aria-describedby={error ? errorId : hintId}
  aria-invalid={error ? true : undefined}
/>
{error ? (
  <p id={errorId}>{error}</p>
) : (
  <p id={hintId}>We only use this to send your receipt.</p>
)}
\`\`\`

A few rules I follow:

- **Set \`aria-invalid\` only when the field is invalid.** Marking everything invalid on first render makes the whole form noisy.
- **Write errors that say how to fix it.** "Enter an email like name@example.com" beats "Invalid input".
- **Don't rely on colour.** A red border alone fails for colour-blind users. Add text, and an icon if you like, but text is the part that matters.
- **Don't use \`required\` as the only signal.** Mark required fields in the label text as well, and say once at the top what the asterisk means.

## Validate when it helps, not while the user is typing

Validating on every keystroke tells someone their email is invalid after they've typed one character. That's hostile, and screen readers can announce it on every change.

My default: validate on blur for the field's first interaction, then revalidate on change once the field has an error, so the message clears as soon as the user fixes it. And always validate on submit.

\`\`\`tsx
const [touched, setTouched] = useState(false);
const error = touched ? validateEmail(value) : undefined;

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onBlur={() => setTouched(true)}
/>
\`\`\`

Keep the browser's native constraints too (\`required\`, \`type="email"\`, \`minLength\`) as a baseline. If you replace the browser's popup bubbles with your own messages, add \`noValidate\` to the form and make sure your messages are at least as good.

## Handle focus on submit

This is the part most teams skip, and it's the one users notice. When submit fails, a sighted mouse user sees red text. A keyboard or screen reader user sees nothing change; focus stays on the button, and the page is silent.

Two patterns work. For short forms, move focus to the first invalid field. For long forms, render an error summary at the top, focus it, and link each item to its field.

\`\`\`tsx
function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const result = validate(values);

  if (!result.ok) {
    setErrors(result.errors);
    const firstInvalid = Object.keys(result.errors)[0];
    // wait for aria-invalid and messages to render, then focus
    requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>('[name="' + firstInvalid + '"]')
        ?.focus();
    });
    return;
  }

  void submit(values);
}
\`\`\`

For the summary variant:

\`\`\`tsx
<div
  ref={summaryRef}
  tabIndex={-1}
  role="alert"
  className="focus:outline-none"
>
  <h2>There are {count} problems with your submission</h2>
  <ul>
    {entries.map(([name, message]) => (
      <li key={name}>
        <a href={'#' + name}>{message}</a>
      </li>
    ))}
  </ul>
</div>
\`\`\`

\`tabIndex={-1}\` makes the container focusable from script without adding it to the tab order. Each link jumps to the field by id, so make sure your input ids match what you link to.

## Announce async results

Success messages and server errors arrive after a network request, so no focus move happens naturally. Use a live region that exists in the DOM before its content changes.

\`\`\`tsx
<p role="status" aria-live="polite">
  {status === "success" ? "Message sent. I'll reply within two days." : ""}
</p>
\`\`\`

Use \`role="status"\` (polite) for confirmations and \`role="alert"\` (assertive) for failures that block the user. Rendering the element conditionally, so it mounts already containing text, often isn't announced. Keep the empty container mounted and swap the text.

Also disable double submits properly. Setting \`aria-disabled\` and ignoring clicks keeps the button focusable; setting \`disabled\` drops focus out of the page when the button is the active element.

## Group related controls

Radio buttons and checkbox sets need a group name, otherwise a screen reader announces "Standard, radio button" with no question attached. \`fieldset\` and \`legend\` do exactly this.

\`\`\`tsx
<fieldset>
  <legend>Preferred contact method</legend>
  <label><input type="radio" name="contact" value="email" /> Email</label>
  <label><input type="radio" name="contact" value="phone" /> Phone</label>
</fieldset>
\`\`\`

Don't fight the default styling to the point of removing it. Reset it, restyle the legend, and keep the semantics.

## One Field component so the pattern is hard to break

Repeating this wiring across thirty inputs guarantees someone forgets an attribute. I wrap it once.

\`\`\`tsx
import { useId, type InputHTMLAttributes } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Field({ label, hint, error, ...inputProps }: FieldProps) {
  const id = useId();
  const hintId = hint ? id + "-hint" : undefined;
  const errorId = error ? id + "-error" : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {hint && <p id={hintId}>{hint}</p>}
      <input
        {...inputProps}
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      {error && <p id={errorId}>{error}</p>}
    </div>
  );
}
\`\`\`

Both the hint and the error stay in \`aria-describedby\` when present, so users still hear the hint after an error. Extending \`InputHTMLAttributes\` means \`type\`, \`name\`, \`autoComplete\` and \`required\` pass through without extra props. Build a \`Textarea\` and \`Select\` the same way and you're mostly done.

## Test it in five minutes

You don't need an audit to catch the big problems:

1. Unplug the mouse. Can you complete the form with Tab, Shift+Tab, Space and Enter alone?
2. Is focus always visible? If you removed the outline, replace it with something at least as clear.
3. Turn on a screen reader (VoiceOver or NVDA) and submit with errors. Do you hear what went wrong and where?
4. Zoom to 200%. Does anything overlap or require horizontal scrolling?
5. Run axe DevTools or the Lighthouse accessibility check to catch missing labels and contrast.

For component tests, query by role and label, which doubles as an accessibility check:

\`\`\`tsx
const input = screen.getByRole("textbox", { name: /email address/i });
expect(input).toHaveAccessibleDescription(/enter an email like/i);
\`\`\`

If \`getByRole\` can't find your input by its label, a screen reader can't either.

## Conclusion

Accessible forms are mostly discipline: a real label on every input, errors linked with \`aria-describedby\`, focus moved on a failed submit, and async results announced. Put that discipline in one typed \`Field\` component and you stop re-solving it per form. Do the five-minute keyboard and screen reader check before you ship, and you'll catch most of what an audit would find.`,
};
