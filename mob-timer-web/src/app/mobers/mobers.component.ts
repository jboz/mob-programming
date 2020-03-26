import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { AddMober } from "../moders.store";

@Component({
  selector: "app-mobers",
  templateUrl: "./mobers.component.html",
  styleUrls: ["./mobers.component.scss"]
})
export class MobersComponent implements OnInit {
  form = this.fb.group({ name: ["", Validators.required] });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {}

  addMober() {
    this.store
      .dispatch(new AddMober(this.form.value))
      .subscribe(() => this.form.patchValue({ name: "" }));
  }
}
