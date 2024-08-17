---
title: Precision preserving affine zoom on point
subtitle: Or, the other way to zoom in on a point with a matrix
--- 

The normal way

```rust
let scale_focus = self
    .point_to_local_space(ctx, Point::new(state.position.x, state.position.y))
    .to_vec2();

self.transform = self.transform
    * Affine::IDENTITY
        .then_translate(-scale_focus)
        .then_scale(1.0 + delta.y * ZOOM_SENSITIVITY)
        .then_translate(scale_focus);
```

the other way with no error buildup

```rust
let focus_point = self
    .point_to_local_space(ctx, Point::new(state.position.x, state.position.y))
    .to_vec2();

let initial_scale = self.transform.determinant().sqrt();
let new_scale = initial_scale + delta.y * ZOOM_SENSITIVITY;
let new_scale = new_scale.max(ZOOM_SENSITIVITY);

self.transform = Affine::IDENTITY
    .then_scale(new_scale)
    .then_translate(self.transform.translation());

// adjust for the fact that we zoom in on the origin
let delta = focus_point_end - focus_point;
self.transform = self.transform.pre_translate(delta);
```
