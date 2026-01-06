# Card Image Specifications

This document defines the required image specifications for all card types in the card collecting application.

## Image Requirements

All images must adhere to these specifications to ensure consistent display across the application.

### Badge Cards

- **Dimensions**: 800x1000px
- **Aspect Ratio**: 4:5 (0.8)
- **Format**: WebP (preferred), PNG, or JPG
- **File Size**: Recommended < 200KB
- **Content Guidelines**:
  - Badge/emblem should be centered
  - Transparent or solid background works best with foil effect
  - High contrast recommended for visibility against metallic background

### Landscape Cards

- **Dimensions**: 1700x1000px
- **Aspect Ratio**: 1.7:1
- **Format**: WebP (preferred), PNG, or JPG
- **File Size**: Recommended < 300KB
- **Content Guidelines**:
  - Wide panoramic scenes work best
  - Horizontal orientation
  - Key visual elements should be centered

### Portrait Cards

- **Dimensions**: 800x1000px
- **Aspect Ratio**: 4:5 (0.8)
- **Format**: WebP (preferred), PNG, or JPG
- **File Size**: Recommended < 200KB
- **Content Guidelines**:
  - Character portraits or vertical compositions
  - Subject should be centered
  - Vertical orientation

## File Naming Convention

Images should be stored in `/frontend/public/images/` and follow this naming pattern:

```
{Collection}_{CardName}.webp
```

Examples:
- `Disney_Mickey_Mouse.webp`
- `Disney_Castle.webp`
- `Disney_Donald_Duck.webp`

## Technical Notes

- Images are displayed with `object-fit: contain` to maintain aspect ratio
- Padding is applied to prevent images from touching card edges
- Drop shadows are added for depth
- Images appear only on collected cards
- Missing cards show placeholder silhouettes

## Testing

When adding new images, verify:
1. Correct dimensions and aspect ratio
2. File size is optimized
3. Image displays correctly on both light and dark modes
4. Image works with card hover effects
5. Image is visible in modal preview
