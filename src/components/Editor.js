import React from "react"
import ReactMde from "react-mde"
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

function Editor(props) {
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true
      });
      
    const [selectedTab, setSelectedTab] = React.useState("write")

  return (
      <div className="container">
      <ReactMde
        value={props.findCurrentNote.body}
        onChange={props.updateNote}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={markdown =>
          Promise.resolve(converter.makeHtml(markdown))
        }
      />
    </div>
  );
}

export default Editor;