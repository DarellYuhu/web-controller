import MDEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

export const MarkdownEditor = ({
  onValueChange,
  value,
}: {
  onValueChange: (value: string) => void;
  value: string;
}) => {
  function handleEditorChange({ text }: { html: string; text: string }) {
    onValueChange(text);
  }
  return (
    <MDEditor
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={(val) => handleEditorChange(val)}
      value={value}
    />
  );
};
