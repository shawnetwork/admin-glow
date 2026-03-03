

## Plan: Add Edit Rank Dialog

### Approach
Reuse the existing create dialog pattern but pre-fill it with the selected rank's data when the Edit button is clicked.

### Changes (single file: `src/pages/RanksPage.tsx`)

1. **Add state** for edit mode: `editingRank: RankConfig | null` and a separate `editOpen` boolean
2. **When Edit is clicked**, set `editingRank` to that rank's data, populate `form` state with its values, and open the dialog
3. **Add an Edit Dialog** (same structure as create dialog) that submits an update instead of a create — updates the rank in the `ranks` array by matching `id`
4. **Reset** `editingRank` and form on close
5. Show a success toast on save

This keeps everything in one file, following the existing pattern for the create dialog and delete alert.

