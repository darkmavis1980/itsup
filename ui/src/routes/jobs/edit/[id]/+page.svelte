<script lang="ts">
  import type { PageData } from './$types';
  import { httpRequest } from '$lib/http';
  import Dropdown from '../../../../components/Dropdown.svelte';
  import Field from '../../../../components/Field.svelte';

  export let data: PageData;

  const submitForm = async () => {
    try {
      const formData = {...data};
      httpRequest.patch(`jobs/${data.id}`, formData);
    } catch (error: any) {
      console.log('Something went wrong');
    }
  };

  const statusOptions = [
    {
      label: 'Active',
      value: 'active',
      selected: data.status === 'active',
    },
    {
      label: 'Disabled',
      value: 'disabled',
      selected: data.status === 'disabled',
    }
  ];

  const onChangeStatus = (event) => {
    data.status = event.target.value;
  };
</script>

<svelte:head>
	<title>Edit {data.name}</title>
</svelte:head>

<div>
  <h2>Edit {data.name}</h2>
  <form on:submit|preventDefault={submitForm}>
    <Field label="Name" name="name">
      <input type="text" name="name" id="name" bind:value={data.name} />
    </Field>
    <Field label="Url" name="url">
      <input type="text" name="url" id="url" bind:value={data.url} />
    </Field>
    <Field label="Status" name="status">
      <Dropdown onChange={onChangeStatus} options={statusOptions} selectName="status" />
    </Field>
    <button type="submit">Send</button>
  </form>
</div>