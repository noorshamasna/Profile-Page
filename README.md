# Profile page

    npm install
    npm run dev      # open the URL Vite prints (usually http://localhost:5173)

## Structure

    src/
    ├── main.jsx, App.jsx            # standalone demo only
    ├── ProfilePage.jsx              # the page: composes the components below
    ├── profile.css                  # all styles, scoped under .pf
    ├── profileData.js               # sample data + pure helpers (no React)
    ├── constants/config.js          # TABS, KIND, form config (F), COLL
    ├── utils/helpers.js             # cx, uid, infoText, reviewOf, patchFor
    ├── hooks/
    │   ├── useProfileData.js        # data state + upd/add/del/merge (swap for your API)
    │   ├── useProfileFilters.js     # search + "Needs review" filter, totals, flags
    │   ├── useSections.js           # open/closed sections + scroll-to-section
    │   └── useModal.js              # Esc to close + body scroll lock
    └── components/
        ├── ui/                      # Badge, StatusBadge, InIcon, SourceList, IconButton, Callout, Option
        ├── layout/                  # ProfileHeader, CompletionCard, StatsGrid, SectionNav, Toolbar
        ├── sections/                # Section, Row, rowMappers, IssuesSection, SummarySection,
        │                            # SkillsSection, SkillChip, CollectionSection (exp/edu/proj/cert)
        └── drawers/                 # Drawer, DrawerFooter, FieldInput, EditDrawer, ActiveDrawer,
                                     # ConflictDrawer, DuplicateDrawer, LinkDrawer, SkillDrawer,
                                     # TextFixDrawer, PhoneDrawer, SkillDialog

To use it in your own project, copy the whole `src/` folder except `App.jsx` and `main.jsx`,
run `npm i lucide-react`, and pass `onNavigate` from your router:

    <ProfilePage sourcesPath="/sources" onNavigate={(path) => navigate(path)} />
