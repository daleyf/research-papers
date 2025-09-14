# research papers

## power to the human researcher, not the ai
- bronze-silver-golden papers
- human source, llm summary, llm meaning




### continous summary for codex
```json
{
  "conversation_summary": {
    "topic": "Research / Retrieval-based project",
    "core_idea": "AI-powered system to help researchers organize and retrieve information from their own papers.",
    "proposed_features": {
      "categorization": {
        "user_controlled": "Researchers assign their own categories such as silver, gold, platinum.",
        "AI_assist": "AI can suggest tags or categories but researcher makes final decision."
      },
      "retrieval": {
        "text_diffusion": "AI surfaces the exact snippet or paragraph needed from large collections.",
        "contextual_search": "Researcher types a specific question and AI pulls relevant excerpts across all papers."
      },
      "multi_layered_output": [
        "Direct snippet from the source paper",
        "AI-generated summary of that snippet",
        "AI insight or takeaway explaining relevance to the researcher’s query"
      ],
      "workflow": [
        "Researcher selects papers (e.g., 10) and sorts them into categories",
        "System processes documents in ~30 minutes (cloud or local)",
        "Researcher queries system with prompts/questions",
        "AI delivers snippets, summaries, and insights instantly"
      ],
      "UI_ideas": {
        "smart_preview": "Highlight top 2–3 relevant snippets per paper for quick browsing.",
        "click_navigation": "Clicking a snippet jumps to full paper location.",
        "tagging_interface": "Simple UI for user to assign categories and tags."
      }
    },
    "design_principles": {
      "human_in_control": "Researcher decides categories and has final say.",
      "AI_as_assistant": "AI accelerates retrieval, provides summaries and context, but doesn’t override researcher judgment.",
      "offline_option": "System can run locally (free/offline) or call cloud models if needed."
    },
    "end_goal": "Seamless, researcher-friendly retrieval system that saves time, keeps human control, and enhances discovery with layered AI support."
  },
  "ui_spec": {
    "label_schema": {
      "default_tiers": ["bronze", "silver", "gold"],
      "allow_custom_tiers": true,
      "notes": "Project starts with bronze/silver/gold; researcher may add platinum or others later."
    },
    "entry_points": {
      "new_project": {
        "actions": ["Select Folder", "Drag & Drop Folder", "Open Recent"],
        "folder_selection": {
          "recursive_scan": true,
          "supported_formats": ["pdf", "docx", "txt", "md"],
          "ignore_patterns": [".DS_Store", "Thumbs.db", "*/node_modules/*"],
          "deduplication": "hash-based (SHA-256) with filename fallback",
          "progress_ui": "file count + bytes processed + ETA bar"
        }
      }
    },
    "main_layout": {
      "regions": {
        "left_sidebar": {
          "panes": [
            {
              "name": "Library",
              "elements": [
                "Project name",
                "Folder path",
                "Counts by label {bronze/silver/gold/unlabeled}",
                "Filters: label, tags, year, venue, authors"
              ]
            },
            {
              "name": "Bulk Tools",
              "elements": [
                "Check-all / none",
                "Bulk label: bronze/silver/gold",
                "Bulk tag add/remove"
              ]
            }
          ]
        },
        "center_results": {
          "components": [
            "Search bar (natural language)",
            "Result list (cards) with title, authors, venue, year, labels, tags",
            "Smart preview: top 2–3 highlighted snippets per paper"
          ]
        },
        "right_panel": {
          "tabs": [
            {
              "name": "Reader",
              "features": [
                "PDF viewer with page thumbnails",
                "Click-navigation from snippet → exact page/offset",
                "In-document highlights for query matches"
              ]
            },
            {
              "name": "Label & Notes",
              "features": [
                "Label picker: bronze/silver/gold (radio)",
                "AI label suggestion (explainable rationale)",
                "Tags (chips) + freeform notes",
                "Confidence meter for AI suggestion"
              ]
            },
            {
              "name": "Snippets",
              "features": [
                "Extracted snippets with source locator",
                "One-click copy of: snippet | summary | insight",
                "Pin important snippets"
              ]
            }
          ]
        }
      }
    },
    "labeling_workflow": {
      "per_item": {
        "hotkeys": {
          "bronze": "1",
          "silver": "2",
          "gold": "3",
          "next": "j",
          "prev": "k",
          "accept_ai_suggestion": "a",
          "toggle_preview": "p"
        },
        "actions": [
          "Assign label (bronze/silver/gold)",
          "Add tags",
          "Write short rationale (optional)",
          "Mark for re-review"
        ],
        "ai_assist": {
          "inputs": ["title", "abstract", "metadata", "top snippets"],
          "outputs": ["suggested_label", "explanation", "confidence_0_1"],
          "controls": ["Accept", "Reject", "Edit"],
          "safety": "Never auto-apply; human confirmation required"
        }
      },
      "bulk_mode": {
        "selection": "multi-select via checkboxes or shift-click range",
        "preview": "sample 1–2 snippets per selected doc",
        "apply": "apply label/tag to selection with undo",
        "conflict_handling": "show mixed-label indicator; applying overwrites unless 'preserve existing' is checked"
      }
    },
    "search_and_filters": {
      "query_types": ["keyword", "natural language question", "regex (advanced)"],
      "scopes": ["All docs", "Current filter", "Pinned results only"],
      "filters": {
        "label": ["bronze", "silver", "gold", "unlabeled"],
        "metadata": ["year", "venue", "author"],
        "tags": "multi-select chips",
        "has_snippets": true
      },
      "result_actions": ["Open", "Quick label", "Pin", "Copy citation", "Export snippet"]
    },
    "multi_layered_output_ui": {
      "card_view": {
        "sections": [
          "Snippet (verbatim, highlighted)",
          "AI Summary (2–4 sentences)",
          "AI Insight/Takeaway (1–2 bullets on why it matters)"
        ],
        "buttons": ["Copy All", "Go to location", "Pin"]
      }
    },
    "project_persistence": {
      "autosave": true,
      "files": {
        "project.json": "schema describing labels, tags, settings",
        "index.db": "local vector/text index",
        "notes.jsonl": "per-doc notes and decisions"
      },
      "export": [
        "CSV of docs with labels/tags",
        "JSONL of snippets/summaries/insights",
        "BibTeX with label fields"
      ]
    },
    "accessibility": {
      "keyboard_first": true,
      "color_contrast": "WCAG AA for label colors (bronze/silver/gold)",
      "alt_text": "generated for figures when possible"
    },
    "offline_online_modes": {
      "offline": "local embeddings + on-device summarizer where available",
      "online": "optional cloud LLM for better summaries; clearly indicated",
      "privacy": "documents never leave device unless user opts in"
    },
    "empty_states": {
      "no_docs": "Prompt to select a folder or drag-and-drop",
      "no_results": "Suggest relaxing filters or re-indexing"
    },
    "mvp_interactions": [
      "Select folder → scan → show library",
      "Press 'U' to filter Unlabeled → iterate with 1/2/3 hotkeys",
      "Hit '/' to search → enter question → browse smart previews",
      "Open a result → assign label in right panel → add tag 'review-later'"
    ]
  }
}```

## MVP Labeling UI

This repository includes a minimal browser-based interface for labeling a small set of research papers.

### Usage

1. Open `index.html` in a web browser.
2. For each paper, choose a label (bronze, silver, gold) and add a short summary and meaning.
3. Click **Download Labels** to export your annotations as `labels.json`. The page stores your progress in browser local storage.
=======
}
```
